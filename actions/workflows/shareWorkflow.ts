"use server";

import { prisma } from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { isAfter } from "date-fns";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

export async function ShareWorkflow({ id }: { id: string }) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error();
  }
  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("workflow is not published");
  }

  const publicId = nanoid(12);
  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkflowStatus.PUBLISHED,
      shared: true,
      publicId: publicId,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
  return { publicId };
}
