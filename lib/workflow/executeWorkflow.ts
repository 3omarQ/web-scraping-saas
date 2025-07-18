import "server-only"
import { prisma } from "../prisma"
import { WorkflowExecutionStatus } from "@/types/workflow"
import { error } from "console"
import { waitFor } from "../helper/waitFor"
import { ExecutionPhase } from "@prisma/client"
import { AppNode } from "@/types/appNode"
import { ExecutorRegistry } from "./executor/registry"
export async function ExecuteWorkflow (
    executionId:string
){
    const execution = await prisma.workflowExecution.findUnique({
        where:{
            id:executionId,
        },
        include:{
            workflow:true,
            executionPhases:true
        }
    })

    if (!execution){
        throw new Error("Execution not found")
    }

    //Set up the execution environment

    const environment = {phases : {
    }}
    
    //Initialize workflow execution

    await initializeWorkflowExecution(executionId,execution.workflowId)

    //initialize phases status

    await initializePhaseStatuses(execution)


    let executionFailed = false

    for(const phase of execution.executionPhases){
        //execute phase
        const phaseExecution = await executeWorkflowPhase(phase);
        if(!phaseExecution.success){
            executionFailed = true;
            break;
        }


    }

    // finalize execution (update status to failed or completed)

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed)
}

async function initializeWorkflowExecution(executionId:string,workflowId:string){
    await prisma.workflowExecution.update({
        where:{
            id:executionId,
        },
        data:{
            startedAt:new Date(),
            status:WorkflowExecutionStatus.RUNNING,
        }
    })

    await prisma.workflow.update({
        where:{
            id:workflowId,
        },
        data:{
            lastRunAt:new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId:executionId
        }
    })
}

async function initializePhaseStatuses (execution:any){
    await prisma.executionPhase.updateMany({
        where:{
            id:{
                in: execution.executionPhases.map((phase:any)=>phase.id),
            }
        },
        data:{
            status:WorkflowExecutionStatus.PENDING
        }
    })
}

async function finalizeWorkflowExecution(executionId:string,workflowId:string,executionFailed:boolean){
    const finalStatus = executionFailed? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.FINISHED
    await prisma.workflowExecution.update({
        where:{
            id:executionId,
        },
        data:{
            status:finalStatus,
            completedAt:new Date(),

        }
    }) 

    await prisma.workflow.update({
        where:{
            id:workflowId
        },
        data:{
            lastRunStatus:finalStatus,

        }
    }).catch((err)=>{});
}

async function executeWorkflowPhase(phase:ExecutionPhase){
    const startedAt = new Date()
    const node = JSON.parse(phase.node) as AppNode
    await prisma.executionPhase.update({
        where:{
            id:phase.id,
        },
        data:{
            status:WorkflowExecutionStatus.RUNNING,
            startedAt:startedAt
        }
    })
    
    await waitFor(3000);
    const success=Math.random() < 0.9;

    await finalizePhase(phase.id,success);

    return {success}

}

async function finalizePhase(phaseId:string,success:boolean) {
    await prisma.executionPhase.update({
        where:{
            id:phaseId,
        },
        data:{
            completedAt:new Date(),
            status: success==true? WorkflowExecutionStatus.FINISHED : WorkflowExecutionStatus.FAILED
        }
    })
}

async function executePhase(phase:ExecutionPhase,node:AppNode): Promise<boolean> {
    const runFn = ExecutorRegistry[node.data.type];
    if(!runFn){
        return false
    }
    return await runFn();
}