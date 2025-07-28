import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function RunBtn({ workflowId }: { workflowId: string }) {
  const runMutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () =>
      toast.success("Workflow ran successfully", { id: workflowId }),
    onError: () =>
      toast.error("Something went wrong while running the workflow", {
        id: workflowId,
      }),
  });
  return (
    <div>
      <Button
        disabled={runMutation.isPending}
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={() => {
          runMutation.mutate({
            workflowId: workflowId,
          });
        }}
      >
        <PlayIcon className="stroke-orange-400"></PlayIcon>
        Run
      </Button>
    </div>
  );
}

export default RunBtn;
