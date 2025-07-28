"use client";

import { Workflow } from "@prisma/client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import WorkflowFormDialog from "./WorkflowFormDialog";
import WorkflowCard from "./WorkflowCard";

export default function UserWorkflowsClient({
  workflows,
}: {
  workflows: Workflow[];
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success("Workflow created", { id: "create-workflow" });
    },
    onError: () => {
      toast.error("Error creating workflow", { id: "create-workflow" });
    },
  });

  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <WorkflowFormDialog
          onSubmit={(values) => {
            toast.loading("Creating workflow...", { id: "create-workflow" });
            mutate(values);
          }}
          isPending={isPending}
        />
      </div>

      {workflows.length === 0 ? (
        <div className="flex flex-col gap-4 h-full items-center justify-center">
          <p className="font-bold">No workflows created yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      )}
    </>
  );
}
