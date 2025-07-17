import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";
import Topbar from "./topbar/Topbar";
import NodesMenu from "./NodesMenu";
import { FlowValidationProvider } from "@/components/contexts/FlowValidationContext";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <FlowValidationProvider>
          <Topbar
            title="Workflow Editor"
            subtitle={workflow.name}
            workflowId={workflow.id}
            hideButtons={false}
          />
          <section className="flex h-full overflow-auto">
            <NodesMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </FlowValidationProvider>
      </div>
    </ReactFlowProvider>
  );
}

export default Editor;
