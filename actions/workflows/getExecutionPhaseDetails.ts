"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export async function GetExecutionPhaseDetails(phaseId:string){
    return prisma.executionPhase.findUnique({
        where:{
            id:phaseId,
            userId: await getUserId(),
        },
        include:{
            logs:{
                orderBy:{
                    timestamp : "asc"
                }
            }
        }
    })
}