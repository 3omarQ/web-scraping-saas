'use server';

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function DeleteWorkflow(id: string){
    await prisma.workflow.delete({
        where: {
            id,
            userId: DEFAULT_USER_ID,
        },
    });

    revalidatePath(`/workflows`)

}