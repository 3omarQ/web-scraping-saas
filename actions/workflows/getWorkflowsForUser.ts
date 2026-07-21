'use server';

import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";

export async function GetWorkflowsForUser(){
    noStore();
    return prisma.workflow.findMany({
        where:{
            userId: DEFAULT_USER_ID,
        },
        orderBy:{
            createdAt:"asc"
        }
    })
}