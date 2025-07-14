"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskParam } from "@/types/task";
import React, { useId } from "react";

interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}

function BrowserInstanceParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();
  return (
    <div className="space-y-1 p-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
      </Label>
    </div>
  );
}

export default BrowserInstanceParam;
