import { prisma } from "@/lib/prisma";
import React from "react";
import Editor from "../../_components/Editor";
import { EditorMode } from "@/types/editorMode";

async function page({ params }: { params: { public_id: string } }) {
  const { public_id } = params;
  const workflow = await prisma.workflow.findUnique({
    where: {
      publicId: public_id,
      shared: true,
    },
  });
  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} mode={EditorMode.VIEWER_ANON} />;
}

export default page;
