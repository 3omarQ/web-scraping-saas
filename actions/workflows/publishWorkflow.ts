"use server";

import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { WorkflowStatus } from "@/types/workflow";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId: DEFAULT_USER_ID,
    },
  });

  if (!workflow) {
    throw new Error();
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);

  if (result.errors.length > 0) {
    throw new Error("errors in execution plan");
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated");
  }

  await prisma.workflow.update({
    where: {
      id,
      userId: DEFAULT_USER_ID,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      status: WorkflowStatus.PUBLISHED,
    },
  });
  revalidatePath(`/workflow/editor/${id}`);
}
