import React, { ReactNode, Suspense } from "react";
import Topbar from "../../_components/topbar/Topbar";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { InboxIcon, Loader2Icon } from "lucide-react";
import ExecutionsTable from "./_components/ExecutionsTable";

function ExecutionsPage({ params }: { params: { workflowId: string } }) {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        title="All runs"
        subtitle="List of all workflow runs"
        hideButtons
      ></Topbar>
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Loader2Icon
              size={30}
              className="animate-spin stroke-primary"
            ></Loader2Icon>
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}
async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <>No Data</>;
  }
  if (executions.length === 0) {
    return (
      <div className="container w-full h-screen py-6">
        <div className="flex flex-col items-center gap-4 justify-center h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary"></InboxIcon>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }
  //refetch executions in the ExecutionsTable, so that when a new one is added, it appears,
  //so here we use serverside fetches as initial data
  return (
    <div className=" container py-6 w-full">
      <ExecutionsTable
        workflowId={workflowId}
        initialData={executions}
      ></ExecutionsTable>
    </div>
  );
}

export default ExecutionsPage;
