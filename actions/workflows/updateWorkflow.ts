"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
    id,
    definition
}:{
    id:string,
    definition:string
}){
    const userId = await getUserId();

    const workflow = await prisma.workflow.findUnique({
        where:{
            id,
            userId,
        },
    });

    if (!workflow) throw new Error("workflow not found")
    
    await prisma.workflow.update({
        data:{
            definition,
        },
        where:{
            id,
            userId,
        }
    })

    revalidatePath("workflows")
}