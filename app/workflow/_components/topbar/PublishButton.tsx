import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { id } from "date-fns/locale";
import { BookPlus, PlayIcon, UploadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function PublishButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useExecutionPlan();

  const saveMutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () =>
      toast.success("Workflow published successfully", { id: workflowId }),
    onError: () =>
      toast.error("Something went wrong while publishing the workflow", {
        id: workflowId,
      }),
  });
  return (
    <div>
      <Button
        disabled={saveMutation.isPending}
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={() => {
          const plan = generateExecutionPlan();
          const workflowDefinition = JSON.stringify(toObject());

          if (!plan) {
            return;
          }
          toast.loading("Publishing workflow...", { id: workflowId });
          saveMutation.mutate({
            id: workflowId,
            flowDefinition: workflowDefinition,
          });
        }}
      >
        <BookPlus className="stroke-green-400"></BookPlus>
        Publish
      </Button>
    </div>
  );
}

export default PublishButton;
