"use server";

import { prisma } from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegisty } from "@/lib/workflow/task/registry";
import { WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { number } from "zod";

export async function RunWorkflow(form:{workflowId:string, workflowDefinition?:string}) {
    const {userId}= auth();
    if(!userId){
        throw new Error("unauthenticated")
    }
    const {workflowId,workflowDefinition} = form;
    if(!workflowId){
        throw new Error("workflowId is required")
    }

    const workflow = await prisma.workflow.findUnique({
        where:{
            userId,
            id:workflowId
        }
    })

    if(!workflow){
        throw new Error("workflow not found")
    }

    let executionPlan:WorkflowExecutionPlan;
    if(!workflowDefinition){
        throw new Error("flow definition is not defined")
    }

    const flow = JSON.parse(workflowDefinition)

    const result = FlowToExecutionPlan(flow.nodes,flow.edges);

    if(!result.executionPlan){
        throw new Error("no execution plan generated")
    }
    executionPlan = result.executionPlan
    console.log("@ExecutionPlan",executionPlan)

    if(result.errors.length!=0){
        console.log("@Errors",result.errors)
        throw new Error("flow definition not valid")
    }

    const execution = await prisma.workflowExecution.create({
        data:{
            workflowId,
            userId,
            status:WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger:WorkflowExecutionTrigger.MANUAL,
            executionPhases:{
                create: executionPlan.flatMap(executionPhase =>{
                    return executionPhase.nodes.flatMap((node)=>{
                        return{
                            userId,
                            status:WorkflowExecutionStatus.CREATED,
                            number:executionPhase.phase,
                            node:JSON.stringify(node),
                            name: TaskRegisty[node.data.type].label,
                        }
                    })
                })
            },
            

        },
        select:{
            id:true,
            executionPhases:true,
        },

    })
    if (!execution){
        throw new Error("workflow execution not created")
    }
    ExecuteWorkflow(execution.id)
    redirect(`/workflow/runs/${workflowId}/${execution.id}`)
}
