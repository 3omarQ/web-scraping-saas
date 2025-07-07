'use server';

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import {z } from "zod";
import { error } from "console";
import { WorkflowStatus } from "@/types/workflow";
import { redirect } from "next/navigation";

export async function CreateWorkflow(form:createWorkflowSchemaType){
    const {userId} = auth();
    if(!userId){
        throw new Error("unauthenticated");
    }

    const {success,data} = createWorkflowSchema.safeParse(form)
    if(!success){
        throw new Error("invalid form data")
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "TODO",
            ...data
        }
    });

    if(!result){
        throw new Error("Failed to create workflow")
    };

    redirect(`/workflows/editor/${result.id}`)



}