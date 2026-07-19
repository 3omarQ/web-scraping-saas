"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";

export async function UnPublishWorkflow({ id }: { id: string }) {
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId: DEFAULT_USER_ID,
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
      userId: DEFAULT_USER_ID,
    },
    data: {
      executionPlan: null,
      status: WorkflowStatus.DRAFT,
    },
  });
  revalidatePath(`/workflow/editor/${id}`);
}
