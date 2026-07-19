"use server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";

export async function GetWorkflowExecutions(workflowId: string) {
  return await prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId: DEFAULT_USER_ID,
    },
    orderBy: {
      startedAt: "desc",
    },
  });
}
