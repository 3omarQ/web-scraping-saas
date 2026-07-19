"use server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function DeleteExecution(id: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id },
    select: { workflowId: true, userId: true },
  });

  if (!execution || execution.userId !== DEFAULT_USER_ID) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.workflowExecution.delete({
    where: { id },
  });
  revalidatePath(`/workflow/runs/${execution.workflowId}`);
  return id;
}
