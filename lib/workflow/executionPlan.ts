import { AppNode } from "@/types/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { TaskRegisty } from "./task/registry";

type FlowValidationError = {
  nodeId: string;
  inputName?: string;
  message: string;
};

type FlowToExecutionPlanType = {
    executionPlan: WorkflowExecutionPlan | null;
    errors: FlowValidationError[];
}

export function FlowToExecutionPlan(nodes:AppNode[],edges:Edge[]) : FlowToExecutionPlanType{
    const entryPoint = nodes.find(nd=>TaskRegisty[nd.data.type].isEntryPoint)

    const errors: FlowValidationError[] = [];

    if(!entryPoint){
        errors.push({ nodeId: "", message: "Entry point doesn't exist" });
        return { executionPlan: null, errors };
    }

    const plannedNodes = new Set<string>();

    const executionPlan: WorkflowExecutionPlan = [{
        phase:1,
        nodes:[entryPoint],
    }];

    plannedNodes.add(entryPoint.id)

    for (let phase = 2; phase <= nodes.length && plannedNodes.size < nodes.length; phase++){
        const nextPhase:WorkflowExecutionPlanPhase = {phase,nodes:[]};
        for(const currentNode of nodes){
            if (plannedNodes.has(currentNode.id)){
                // Node already put in the execution plan
                continue;
            }
            const invalidInputs = getInvalidInputs(currentNode,edges,plannedNodes);
            if(invalidInputs.length>0){
                // when in a phase that didn't reach the last node, the last node
                // won't have inputs because it depends on the first ones
                // so we need to check if all the dependencies of that node have been planned
                const incomers = getIncomers(currentNode,nodes,edges)
                if(incomers.every(incomer=> plannedNodes.has(incomer.id))){
                    // if all incomers are planned, fma mochkol in our node so we throw an error
                    invalidInputs.forEach((inputName) => {
                                errors.push({
                                    nodeId: currentNode.id,
                                    inputName,
                                    message: `Missing or invalid input: ${inputName}`,
                                });
                            });
                }else{
                    continue;
                }
            }

            nextPhase.nodes.push(currentNode);
        }
        for(const node of nextPhase.nodes){
            plannedNodes.add(node.id)
        }
        executionPlan.push(nextPhase)
    }
    if(errors.length>0){
        errors
    }

    return {
        executionPlan,
        errors
    }
;
}

function getInvalidInputs(node: AppNode, edges:Edge[], planned:Set<string>){
    const invalidInputs = [];
    const inputs = TaskRegisty[node.data.type].inputs;

    for(const input of inputs){
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length > 0;
        if(inputValueProvided){
            continue;
        }
        const incomingEdges=edges.filter((edge)=> edge.target === node.id);

        const inputLinkedToOutput= incomingEdges.find(
            (edge)=> edge.targetHandle === input.name
        );

        const requiredInputProvidedByVisitedOutput = 
            input.required &&
            inputLinkedToOutput &&
            planned.has(inputLinkedToOutput.source);
            
        if(requiredInputProvidedByVisitedOutput){
            continue;
        }else if (!input.required){
            // if the input is not required but there is an output linked to it
            // then we need to be sure that the output is already planned
            if(!inputLinkedToOutput) continue;
            if(inputLinkedToOutput && planned.has(inputLinkedToOutput.source)){
                //the output is providing a value to the input: the input is fine
                continue;
            }

        }
        invalidInputs.push(input.name);

    }
    return invalidInputs
}

export const getIncomers = (
  node: AppNode | { id: string },
  nodes: AppNode[],
  edges: Edge[]
): AppNode[] => {
  if (!node.id) {
    return [];
  }
  const incomersIds = new Set();
  edges.forEach((edge) => {
    if (edge.target === node.id) {
      incomersIds.add(edge.source);
    }
  });

  return nodes.filter((n) => incomersIds.has(n.id));
};