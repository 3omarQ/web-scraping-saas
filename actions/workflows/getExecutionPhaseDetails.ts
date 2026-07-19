"use server"

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";

export async function GetExecutionPhaseDetails(phaseId:string){
    return prisma.executionPhase.findUnique({
        where:{
            id:phaseId,
            userId: DEFAULT_USER_ID,
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