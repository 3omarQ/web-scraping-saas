import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useFlowValidation } from "../contexts/FlowValidationContext";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { addError, clearErrors } = useFlowValidation();
  const generateExecutionPlan = useCallback(() => {
    clearErrors();
    const { nodes, edges } = toObject();
    try {
      const { executionPlan, errors } = FlowToExecutionPlan(
        nodes as AppNode[],
        edges
      );

      if (errors.length > 0) {
        errors.forEach((err) => {
          addError(err.message, err.nodeId, err.inputName);
        });
        return null;
      }
      return executionPlan;
    } catch (error: any) {
      const message = error.message || "Unknown flow error";
      addError(message);
    }
  }, [toObject, addError, clearErrors]);
  return generateExecutionPlan;
};

export default useExecutionPlan;
