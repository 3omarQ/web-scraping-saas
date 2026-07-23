import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExecuteButton({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useExecutionPlan();

  const saveMutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => toast.success("Workflow executed successfully"),
    onError: (error) =>
      toast.error(error?.message || "Something went wrong while executing the workflow"),
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
          saveMutation.mutate({
            workflowId: workflowId,
            workflowDefinition: workflowDefinition,
          });
        }}
      >
        <PlayIcon className="stroke-orange-400"></PlayIcon>
        Execute
      </Button>
    </div>
  );
}

export default ExecuteButton;
