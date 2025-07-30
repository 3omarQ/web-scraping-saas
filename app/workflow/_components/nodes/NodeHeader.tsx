"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskRegisty } from "@/lib/workflow/task/registry";
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Copy, Trash2Icon } from "lucide-react";
import React from "react";

function NodeHeader({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const task = TaskRegisty[taskType];
  const { deleteElements, getNode, addNodes, updateNodeData } = useReactFlow();

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16}></task.icon>
      <div className="flex justify-between items-center w-full">
        <p className="font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex items-center gap-1">
          <div>{task.isEntryPoint && <Badge>Entry point</Badge>}</div>
          {!task.isEntryPoint && (
            <div>
              {/* delete button */}
              <Button
                className="text-xs w-3"
                variant={"ghost"}
                onClick={() => {
                  deleteElements({ nodes: [{ id: nodeId }] });
                }}
              >
                <Trash2Icon size={12}></Trash2Icon>
              </Button>

              {/* copy button */}
              <Button
                className="text-xs w-3"
                variant={"ghost"}
                onClick={() => {
                  const node = getNode(nodeId) as AppNode;
                  const newX = node.position.x;
                  const newY = node.position.y + node.measured?.height! + 20;
                  const newNode = createFlowNode(node.data.type, {
                    x: newX,
                    y: newY,
                  });

                  newNode.data.inputs = { ...node.data.inputs };

                  addNodes([newNode]);
                }}
              >
                <Copy size={12}></Copy>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
//TODO: refactor, implement delete and copy buttons in external component
