"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React, { useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
    } catch (error) {
      throw new Error("Couldn't load");
    }
  }, [workflow.definition, setEdges, setNodes]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 3 }}
      >
        <div>
          <Controls position="top-left" fitViewOptions={{ padding: 3 }} />
          <Background variant={BackgroundVariant.Dots} />
        </div>
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
