"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";

export async function GetWorkflowExecutions(workflowId: string) {
  return await prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId: await getUserId(),
    },
    orderBy: {
      startedAt: "desc",
    },
  });
}
