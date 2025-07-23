"use server";

import { waitFor } from "@/lib/helper/waitFor";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  return prisma.workflowExecution.findUnique({
    where: {
      userId,
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
