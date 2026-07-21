'use server';

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { AppNode } from "@/types/appNode";
import { Edge } from "@xyflow/react";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";

import { Prisma } from "@prisma/client";

export async function CreateWorkflow(form: createWorkflowSchemaType) {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) throw new Error("invalid form data");

    const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
        nodes: [createFlowNode(TaskType.LAUNCH_BROWSER)],
        edges: [],
    };

    try {
        const result = await prisma.workflow.create({
            data: {
                userId: DEFAULT_USER_ID,
                status: WorkflowStatus.DRAFT,
                definition: JSON.stringify(initialFlow),
                ...data,
            },
        });
        return result;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
        ) {
            throw new Error("A workflow with this name already exists");
        }
        throw new Error("Failed to create workflow");
    }
}