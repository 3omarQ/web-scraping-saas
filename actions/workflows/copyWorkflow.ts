// actions/workflows/cloneWorkflow.ts
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { WorkflowStatus } from "@/types/workflow";

export async function CloneWorkflow({
  definition,
  name,
  description,
}: {
  definition: string;
  name: string;
  description?: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  const newWorkflow = await prisma.workflow.create({
    data: {
      name,
      description,
      userId,
      definition,
      status: WorkflowStatus.DRAFT,
    },
  });

  return newWorkflow;
}
