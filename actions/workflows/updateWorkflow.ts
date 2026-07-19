"use server"

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
    id,
    definition
}:{
    id:string,
    definition:string
}){
    const workflow = await prisma.workflow.findUnique({
        where:{
            id,
            userId: DEFAULT_USER_ID,
        },
    });

    if (!workflow) throw new Error("workflow not found")
    
    await prisma.workflow.update({
        data:{
            definition,
        },
        where:{
            id,
            userId: DEFAULT_USER_ID,
        }
    })

    revalidatePath("workflows")
}