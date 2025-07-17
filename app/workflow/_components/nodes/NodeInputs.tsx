"use client";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position, useEdges } from "@xyflow/react";
import React, { ReactNode, useEffect, useState } from "react";
import NodeParamField from "./NodeParamField";
import { colorForHandle } from "./common";
import { useFlowValidation } from "@/components/contexts/FlowValidationContext";

export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  const { errors } = useFlowValidation();
  const inputHasError = errors.some(
    (e) => e.nodeId === nodeId && e.inputName === input.name
  );

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (inputHasError) {
      setFlash(true);
      const timeout = setTimeout(() => setFlash(false), 3000); // 2s flash
      //console.log("@ERRORS", errors);
      return () => clearTimeout(timeout);
    }
  }, [inputHasError, errors]);

  return (
    <div
      className={cn(
        "flex justify-start relative p-2 bg-secondary transition-colors duration-300",
        flash && "bg-rose-200"
      )}
    >
      {/*input.name*/}

      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />

      {!input.hideHandle && (
        <Handle
          id={input.name}
          position={Position.Left}
          isConnectable={!isConnected}
          type="target"
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            colorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}
