"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  applyEdgeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
  getOutgoers,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { createFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import NodeComponent from "./nodes/NodeComponent";
import { AppNode } from "@/types/appNode";
import { InputOTPSeparator } from "@/components/ui/input-otp";
import { TaskRegisty } from "@/lib/workflow/task/registry";

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {};

function FlowEditor({
  workflow,
  locked,
}: {
  workflow: Workflow;
  locked: boolean;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  const onEdgeDelete = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));

      changes.forEach((change) => {
        if (change.type === "remove") {
          const removedEdge = edges.find((e) => e.id === change.id);
          if (!removedEdge) return;

          const node = nodes.find((n) => n.id === removedEdge.target);
          if (!node || !removedEdge.targetHandle) return;

          updateNodeData(node.id, {
            inputs: {
              ...node.data.inputs,
              [removedEdge.targetHandle]: "", // or delete it entirely
            },
          });
        }
      });
    },
    [edges, nodes, setEdges, updateNodeData]
  );

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData("application/reactflow");
      if (!taskType) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges) => addEdge({ ...connection, animated: true }, edges));
      if (!connection.targetHandle) return;
      //remove input value if is present on connection
      const targetNode = nodes.find((nd) => nd.id === connection.target);
      if (!targetNode) return;
      const nodeInputs = targetNode.data.inputs;
      nodeInputs[connection.targetHandle] = "";
      delete nodeInputs[connection.targetHandle];
      updateNodeData(targetNode.id, { inputs: nodeInputs });
    },
    [setEdges, updateNodeData, nodes]
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      //no self connection
      if (connection.target === connection.source) {
        return false;
      }

      //same taskParam type connection
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (!sourceNode || !targetNode) {
        return false;
      }

      const sourceTask = TaskRegisty[sourceNode.data.type];
      const targetTask = TaskRegisty[targetNode.data.type];

      const output = sourceTask.outputs.find(
        (op) => op.name === connection.sourceHandle
      );
      const input = targetTask.inputs.find(
        (input) => input.name === connection.targetHandle
      );

      if (output?.type !== input?.type) {
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };
      if (hasCycle(targetNode)) {
        return false;
      }
      return true;
    },
    [nodes, edges]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgeDelete}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        //fitViewOptions={{ padding: 2 }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
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
