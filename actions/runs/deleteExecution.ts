"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function DeleteExecution(id: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: { id },
    select: { workflowId: true, userId: true },
  });

  const currentUserId = await getUserId();
  if (!execution || execution.userId !== currentUserId) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.workflowExecution.delete({
    where: { id },
  });
  revalidatePath(`/workflow/runs/${execution.workflowId}`);
  return id;
}
