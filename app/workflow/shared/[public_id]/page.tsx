import { prisma } from "@/lib/prisma";
import { FileQuestion } from "lucide-react";
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
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="rounded-full bg-muted p-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-bold text-lg">Workflow not found</p>
          <p className="text-sm text-muted-foreground">
            This workflow doesn&apos;t exist or is no longer shared.
          </p>
        </div>
      </div>
    );
  }

  return <Editor workflow={workflow} mode={EditorMode.VIEWER_ANON} />;
}

export default page;
