import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { UnPublishWorkflow } from "@/actions/workflows/unPublishWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { id } from "date-fns/locale";
import { BookDashed, PlayIcon, UploadIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function UnPublishButton({ workflowId }: { workflowId: string }) {
  const saveMutation = useMutation({
    mutationFn: UnPublishWorkflow,
    onSuccess: () =>
      toast.success("Workflow Unpublished successfully", { id: workflowId }),
    onError: (error) =>
      toast.error(error?.message || "Something went wrong while unpublishing the workflow", {
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
          toast.loading("Un-publishing workflow...", { id: workflowId });
          saveMutation.mutate({
            id: workflowId,
          });
        }}
      >
        <BookDashed className="stroke-orange-500"></BookDashed>
        Unpublish
      </Button>
    </div>
  );
}

export default UnPublishButton;
