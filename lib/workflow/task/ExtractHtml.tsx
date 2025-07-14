import { cn } from "@/lib/utils";
import { TaskParamType, TaskType } from "@/types/task";
import { Code2Icon, GlobeIcon, LucideProps } from "lucide-react";

export const ExtractHtmlTask = {
  type: TaskType.EXTRACT_HTML,
  label: "Extract HTML",
  icon: (props: LucideProps) => (
    <Code2Icon {...props} className={cn(props.className, "text-rose-400")} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
    },
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
