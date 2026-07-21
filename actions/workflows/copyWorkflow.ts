// actions/workflows/cloneWorkflow.ts
"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/user";
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
  const newWorkflow = await prisma.workflow.create({
    data: {
      name,
      description,
      userId: await getUserId(),
      definition,
      status: WorkflowStatus.DRAFT,
    },
  });

  return newWorkflow;
}
