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

  //   const saveMutation = useMutation({
  //     mutationFn: ExecuteWorkflow,
  //     onSuccess: () => toast.success("Workflow executed successfully"),
  //     onError: () => toast.success("There was an error while saving"),
  //   });
  return (
    <div>
      <Button
        //disabled={saveMutation.isPending}
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={() => {
          const plan = generateExecutionPlan();
          console.log("@PLAN");
          console.table(plan);
        }}
      >
        <PlayIcon className="stroke-orange-400"></PlayIcon>
        Execute
      </Button>
    </div>
  );
}

export default ExecuteButton;
