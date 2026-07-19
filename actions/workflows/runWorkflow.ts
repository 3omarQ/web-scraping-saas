"use server";

import { prisma } from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegisty } from "@/lib/workflow/task/registry";
import {
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkflowStatus,
} from "@/types/workflow";
import { DEFAULT_USER_ID } from "@/lib/user";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  workflowDefinition?: string;
}) {
  const { workflowId, workflowDefinition } = form;
  if (!workflowId) {
    throw new Error("workflowId is required");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId: DEFAULT_USER_ID,
      id: workflowId,
    },
  });

  if (!workflow) {
    throw new Error("workflow not found");
  }

  let executionPlan: WorkflowExecutionPlan;
  let finalDefinition: string;

  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.executionPlan) {
      throw new Error("no execution plan in published workflow");
    }
    executionPlan = JSON.parse(workflow.executionPlan);
    finalDefinition = workflow.definition;
  } else {
    // workflow is a draft
    if (!workflowDefinition) {
      throw new Error("flow definition is not defined");
    }
    const flow = JSON.parse(workflowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (!result.executionPlan) {
      throw new Error("no execution plan generated");
    }
    executionPlan = result.executionPlan;
    if (result.errors.length != 0) {
      console.log("@Errors", result.errors);
      throw new Error("flow definition not valid");
    }
    finalDefinition = workflowDefinition;
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId: DEFAULT_USER_ID,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExecutionTrigger.MANUAL,
      executionPhases: {
        create: executionPlan.flatMap((executionPhase) => {
          return executionPhase.nodes.flatMap((node) => {
            return {
              userId: DEFAULT_USER_ID,
              status: WorkflowExecutionStatus.CREATED,
              number: executionPhase.phase,
              node: JSON.stringify(node),
              name: TaskRegisty[node.data.type].label,
            };
          });
        }),
      },
      definition: finalDefinition,
    },
    select: {
      id: true,
      executionPhases: true,
    },
  });
  if (!execution) {
    throw new Error("workflow execution not created");
  }
  ExecuteWorkflow(execution.id);
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
