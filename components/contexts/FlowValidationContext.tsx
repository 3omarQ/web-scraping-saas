"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

type FlowValidationError = {
  id: string;
  nodeId?: string;
  inputName?: string;
  message?: string;
};

type FlowValidationContextType = {
  errors: FlowValidationError[];
  addError: (message: string, nodeId?: string, inputName?: string) => void;
  clearErrors: () => void;
};

const FlowValidationContext = createContext<FlowValidationContextType | null>(
  null
);

export function useFlowValidation() {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error(
      "useFlowValidation must be used within FlowValidationProvider"
    );
  }
  return context;
}

export function FlowValidationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [errors, setErrors] = useState<FlowValidationError[]>([]);

  const addError = (message: string, nodeId?: string, inputName?: string) => {
    const err = { id: crypto.randomUUID(), message, nodeId, inputName };
    setErrors((prev) => [...prev, err]);
    toast.error(message, { id: err.id });
  };

  const clearErrors = () => {
    errors.forEach((e) => toast.dismiss(e.id));
    setErrors([]);
  };

  return (
    <FlowValidationContext.Provider value={{ errors, addError, clearErrors }}>
      {children}
    </FlowValidationContext.Provider>
  );
}
