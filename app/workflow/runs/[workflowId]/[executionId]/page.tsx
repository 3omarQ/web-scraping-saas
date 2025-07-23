import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { auth } from "@clerk/nextjs/server";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";

function ExecutionViewerPage({
  params,
}: {
  params: {
    workflowId: string;
    executionId: string;
  };
}) {
  const { workflowId, executionId } = params;
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow run details"
        hideButtons={true}
      />
      <section className="flex w-full h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full h-full justify-center items-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary"></Loader2Icon>
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string;
}) {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not found</div>;
  }
  return (
    <div className="w-full h-full">
      <ExecutionViewer initialData={workflowExecution} />
    </div>
  );
}

export default ExecutionViewerPage;
