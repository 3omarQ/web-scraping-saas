"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnPublishWorkflow({ id }: { id: string }) {
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
    throw new Error("workflow undefined");
  }
  if (workflow.status == WorkflowStatus.DRAFT) {
    throw new Error("workflow is a draft");
  }

  //reset executionPlan and set status to draft
  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      executionPlan: null,
      status: WorkflowStatus.DRAFT,
    },
  });
  revalidatePath(`/workflow/editor/${id}`);
}
