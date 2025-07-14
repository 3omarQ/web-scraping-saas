"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TaskParam } from "@/types/task";
import React, { useEffect, useId, useState } from "react";

interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}

function StringParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  const id = useId();

  let Component = param.variant === "textarea" ? Textarea : Input;
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-600">*</p>}
      </Label>
      <Component
        id={id}
        value={internalValue}
        onChange={(event: any) => updateNodeParamValue(event.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

export default StringParam;
Input;
