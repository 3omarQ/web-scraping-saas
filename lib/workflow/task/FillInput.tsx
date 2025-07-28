import { cn } from "@/lib/utils";
import { TaskParamType, TaskType } from "@/types/task";
import {
  Code2Icon,
  GlobeIcon,
  LucideProps,
  TextCursorInput,
} from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props: LucideProps) => (
    <TextCursorInput
      {...props}
      className={cn(props.className, "text-rose-400")}
    />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: true,
    },
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
