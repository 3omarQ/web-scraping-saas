import { cn } from "@/lib/utils";
import { TaskParamType, TaskType } from "@/types/task";
import { LucideProps, SparklesIcon } from "lucide-react";

export const ExtractDataWithAI = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: "Extract data with AI",
  icon: (props: LucideProps) => (
    <SparklesIcon {...props} className={cn(props.className, "text-rose-400")} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
      hideHandle: false,
    },
    {
      name: "Gemini API Token",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      variant: "textarea",
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamType.STRING,
    },
  ],
};
