import { cn } from "@/lib/utils";
import { TaskParamType, TaskType } from "@/types/task";
import {
  Code,
  Code2Icon,
  GlobeIcon,
  LucideProps,
  TextIcon,
} from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon {...props} className={cn(props.className, "text-rose-400")} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
      variant: "textarea",
      required: true,
      hideHandle: false,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamType.STRING,
    },
    // {
    //   name: "Web page",
    //   type: TaskParamType.BROWSER_INSTANCE,
    // },
  ],
};
