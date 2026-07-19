// actions/workflows/cloneWorkflow.ts
"use server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
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
      userId: DEFAULT_USER_ID,
      definition,
      status: WorkflowStatus.DRAFT,
    },
  });

  return newWorkflow;
}
