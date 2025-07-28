import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import NodesMenu from "./NodesMenu";
import { FlowValidationProvider } from "@/components/contexts/FlowValidationContext";
import { WorkflowStatus } from "@/types/workflow";
import { EditorMode } from "@/types/editorMode";

function Editor({ workflow, mode }: { workflow: Workflow; mode: EditorMode }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <FlowValidationProvider>
          <Topbar
            title="Workflow Editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
            hideButtons={false}
            isPublished={workflow.status == WorkflowStatus.PUBLISHED}
            editorMode={mode}
          />
          <section className="flex h-full overflow-auto">
            {mode === "owner" && <NodesMenu />}
            <FlowEditor workflow={workflow} locked={mode !== "owner"} />
          </section>
        </FlowValidationProvider>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
