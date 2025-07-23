"use client";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./NodeParamField";
import { colorForHandle } from "./common";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export function NodeOutput({
  output,
  nodeId,
}: {
  output: TaskParam;
  nodeId: string;
}) {
  //console.log(Output)

  return (
    <div className="flex justify-end nodrag relative p-2 bg-secondary">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          colorForHandle[output.type]
        )}
      ></Handle>
    </div>
  );
}
