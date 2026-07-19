'use server';

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import {z } from "zod";
import { error } from "console";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";

export async function CreateWorkflow(form:createWorkflowSchemaType){
    const {success,data} = createWorkflowSchema.safeParse(form)
    if(!success){
        throw new Error("invalid form data")
    }

    //initial flow that alawys contains the launch browser entry 
    const initialFlow : {
        nodes:AppNode[],
        edges:Edge[],
    } = {
        nodes : [createFlowNode(TaskType.LAUNCH_BROWSER)],
        edges : [],
    }


    const result = await prisma.workflow.create({
        data: {
            userId: DEFAULT_USER_ID,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data
        }
    });

    if(!result){
        throw new Error("Failed to create workflow")
    };

    redirect(`/workflow/editor/${result.id}`)



}