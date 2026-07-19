"use server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  return prisma.workflowExecution.findUnique({
    where: {
      userId: DEFAULT_USER_ID,
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
