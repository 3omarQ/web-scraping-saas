import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow";
import React from "react";

function PhaseStatusBadge({
  status,
  extraParams,
}: {
  status: string;
  extraParams?: string;
}) {
  return (
    <Badge
      variant={"outline"}
      className={cn(
        "text-muted-foreground uppercase",
        (status as WorkflowExecutionStatus) === "Stopped" && "",
        (status as WorkflowExecutionStatus) === "Completed" && "text-primary",
        (status as WorkflowExecutionStatus) === "Failed" && "text-destructive",
        (status as WorkflowExecutionStatus) === "Running" && "text-yellow-400",
        extraParams
      )}
    >
      {status}
    </Badge>
  );
}

export default PhaseStatusBadge;
