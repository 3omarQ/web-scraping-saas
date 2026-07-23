import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon, SaveIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function SaveButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  //console.log(workflowId);

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => toast.success("Workflow saved"),
    onError: (error) => toast.error(error?.message || "There was an error while saving"),
  });

  return (
    <Button
      disabled={saveMutation.isPending}
      variant={"outline"}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        saveMutation.mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
    >
      <SaveIcon className="stroke-green-400"></SaveIcon>
      Save
    </Button>
  );
}

export default SaveButton;
