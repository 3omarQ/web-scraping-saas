'use server';

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function DeleteWorkflow(id: string){
    await prisma.workflow.delete({
        where: {
            id,
            userId: await getUserId(),
        },
    });

    revalidatePath(`/workflows`)

}