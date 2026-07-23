"use client";

import { Workflow } from "@prisma/client";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import WorkflowFormDialog from "./WorkflowFormDialog";
import WorkflowCard from "./WorkflowCard";
import { useRouter } from "next/navigation";

export default function UserWorkflowsClient({
  workflows: initialData,
}: {
  workflows: Workflow[];
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: workflows } = useQuery({
    queryKey: ["workflows"],
    queryFn: GetWorkflowsForUser,
    initialData,
  });


  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (result) => {
      toast.success("Workflow created", { id: "create-workflow" });
      queryClient.setQueryData<Workflow[]>(["workflows"], (old) => {
        if (!old) return [result];
        return [...old, result];
      });
      router.push(`/workflow/editor/${result.id}`);
    },
    onError: (error) => {
      toast.error(error?.message || "Error creating workflow", { id: "create-workflow" });
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

      {(workflows?.length ?? 0) === 0 ? (
        <div className="flex flex-col gap-4 h-full items-center justify-center">
          <p className="font-bold">No workflows created yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {workflows?.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      )}
    </>
  );
}
