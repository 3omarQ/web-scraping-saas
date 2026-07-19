"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { DEFAULT_USER_ID } from "@/lib/user";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

export async function ShareWorkflow({ id }: { id: string }) {
  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId: DEFAULT_USER_ID,
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
      userId: DEFAULT_USER_ID,
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
