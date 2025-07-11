import { TaskParamType, TaskType } from "@/types/task";
import { Code2Icon, GlobeIcon, LucideProps } from "lucide-react";

export const ExtractHtmlTask = {
  type: TaskType.EXTRACT_HTML,
  label: "Extract HTML",
  icon: (props: LucideProps) => <Code2Icon {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false,
    },
  ],
};
