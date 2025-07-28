import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";
import FlowEditor from "../../_components/FlowEditor";
import { EditorMode } from "@/types/editorMode";

async function page({ params }: { params: { public_id: string } }) {
  const { public_id } = params;
  console.log(public_id);
  const { userId } = auth();
  const workflow = await prisma.workflow.findUnique({
    where: {
      publicId: public_id,
      shared: true,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }
  // const { id, name, description, definition, status } = workflow;
  // const safeWorkflow = { id, name, description, definition, status };

  if (!userId) {
    return <Editor mode={EditorMode.VIEWER_ANON} workflow={workflow} />;
  }
  return (
    <Editor workflow={workflow} mode={EditorMode.VIEWER_LOGGED_IN}></Editor>
  );
}

export default page;
