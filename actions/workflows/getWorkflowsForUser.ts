'use server';

import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export async function GetWorkflowsForUser(){
    noStore();
    const userId = await getUserId();
    return prisma.workflow.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:"asc"
        }
    })
}