import "server-only";
import { prisma } from "../prisma";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { error } from "console";
import { waitFor } from "../helper/waitFor";
import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "@/types/appNode";
import { ExecutorRegistry } from "./executor/registry";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { TaskRegisty } from "./task/registry";
import { TaskParamType } from "@/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/types/log";
import { createLogCollector } from "../log";
export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      executionPhases: true,
    },
  });

  if (!execution) {
    throw new Error("Execution not found");
  }
  const edges = JSON.parse(execution.definition).edges as Edge[];

  //Set up the execution environment

  const environment: Environment = { phases: {} };

  //Initialize workflow execution

  await initializeWorkflowExecution(executionId, execution.workflowId);

  //initialize phases status

  await initializePhaseStatuses(execution);

  let executionFailed = false;

  for (let i = 0; i < execution.executionPhases.length; i++) {
    //execute phase
    const phase = execution.executionPhases[i];
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges
    );
    if (!phaseExecution.success) {
      executionFailed = true;
      //set rest of phases as failed
      for (let j = i + 1; j < execution.executionPhases.length; j++) {
        const phase = execution.executionPhases[j];
        await prisma.executionPhase.update({
          where: {
            id: phase.id,
          },
          data: {
            status: WorkflowExecutionStatus.STOPPED,
          },
        });
      }
      break;
    }
  }

  // finalize execution (update status to failed or completed)

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed
  );
  await cleanUpEnvironment(environment);
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
}

async function initializePhaseStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.executionPhases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: WorkflowExecutionStatus.PENDING,
    },
  });
}

async function finalizeWorkflowExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.FINISHED;
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {});
}

async function executeWorkflowPhase(
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[]
) {
  //initialize phase
  const logCollector = createLogCollector();
  const startedAt = new Date();
  const node = JSON.parse(phase.node) as AppNode;
  setupEnvironmentForPhase(node, environment, edges);
  await prisma.executionPhase.update({
    where: {
      id: phase.id,
    },
    data: {
      status: WorkflowExecutionStatus.RUNNING,
      startedAt: startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  //actually execute the phase
  const success = await executePhase(phase, node, environment, logCollector);

  const outputs = environment.phases[node.id].outputs;

  await finalizePhase(phase.id, success, outputs, logCollector);

  return { success };
}

async function finalizePhase(
  phaseId: string,
  success: boolean,
  outputs: any,
  logCollector: LogCollector
) {
  await prisma.executionPhase.update({
    where: {
      id: phaseId,
    },
    data: {
      completedAt: new Date(),
      status:
        success == true
          ? WorkflowExecutionStatus.FINISHED
          : WorkflowExecutionStatus.FAILED,
      outputs: JSON.stringify(outputs),
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            message: log.message,
            timestamp: log.timestamp,
            logLevel: log.level,
          })),
        },
      },
    },
  });
}

async function executePhase(
  phase: ExecutionPhase,
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): Promise<boolean> {
  const runFn = ExecutorRegistry[node.data.type];
  if (!runFn) {
    return false;
  }

  const executionEnvironment: ExecutionEnvironment = createExecutionEnvironment(
    node,
    environment,
    logCollector
  );
  return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(
  node: AppNode,
  environment: Environment,
  edges: Edge[]
) {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = TaskRegisty[node.data.type].inputs;
  for (const input of inputs) {
    if (input.type == TaskParamType.BROWSER_INSTANCE) continue;
    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }
    // if not inputValue, we get it from outputs in the environment (previous connected node)
    const connectedEdge = edges.find(
      (edge) => edge.target == node.id && edge.targetHandle == input.name
    );
    if (!connectedEdge) {
      console.error("missing edge for input:", input.name, node.id);
      continue;
    }
    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];
    environment.phases[node.id].inputs[input.name] = outputValue;
  }
}

function createExecutionEnvironment(
  node: AppNode,
  environment: Environment,
  logCollector: LogCollector
): ExecutionEnvironment {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => (environment.browser = browser),
    getPage: () => environment.page,
    setPage: (page: Page) => (environment.page = page),
    log: logCollector,
  };
}

async function cleanUpEnvironment(environment: Environment) {
  if (environment.browser) {
    try {
      await environment.browser.close();
    } catch (error) {
      console.error("Cannot close browser:", error);
    }
  }
}
