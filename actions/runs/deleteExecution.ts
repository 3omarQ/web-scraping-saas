"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function DeleteExecution(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  const execution = await prisma.workflowExecution.findUnique({
    where: { id },
    select: { workflowId: true, userId: true },
  });

  if (!execution || execution.userId !== userId) {
    throw new Error("Not found or unauthorized");
  }

  await prisma.workflowExecution.delete({
    where: { id },
  });
  revalidatePath(`/workflow/runs/${execution.workflowId}`);
  return id;
}
