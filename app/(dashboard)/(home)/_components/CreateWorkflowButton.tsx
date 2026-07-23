"use client";

import { CreateWorkflow } from "@/actions/workflows/createWorkflow";
import WorkflowFormDialog from "@/app/(dashboard)/workflows/_components/WorkflowFormDialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateWorkflowButton() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: (result) => {
      toast.success("Workflow created", { id: "create-workflow-home" });
      router.push(`/workflow/editor/${result.id}`);
    },
    onError: (error) => {
      toast.error(error?.message || "Error creating workflow", {
        id: "create-workflow-home",
      });
    },
  });

  return (
    <WorkflowFormDialog
      onSubmit={(values) => {
        toast.loading("Creating workflow...", { id: "create-workflow-home" });
        mutate(values);
      }}
      isPending={isPending}
    />
  );
}
