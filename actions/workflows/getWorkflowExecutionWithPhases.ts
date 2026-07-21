"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  return prisma.workflowExecution.findUnique({
    where: {
      userId: await getUserId(),
      id: executionId,
    },
    include: {
      executionPhases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
