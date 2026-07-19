import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";
import React from "react";
import Editor from "../../_components/Editor";
import { EditorMode } from "@/types/editorMode";

async function page({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId: DEFAULT_USER_ID,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }
  return <Editor workflow={workflow} mode={EditorMode.OWNER}></Editor>;
}

export default page;
