"use client";

import { CloneWorkflow } from "@/actions/workflows/copyWorkflow";
import WorkflowFormDialog from "@/app/(dashboard)/workflows/_components/WorkflowFormDialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { SaveIcon } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function SaveAsButton() {
  const { toObject } = useReactFlow();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: CloneWorkflow,
    onSuccess: () => {
      toast.success("Cloned workflow", { id: "clone-workflow" });
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to clone workflow", { id: "clone-workflow" });
    },
  });

  const handleSubmit = ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }) => {
    const definition = JSON.stringify(toObject());
    toast.loading("Cloning workflow...", { id: "clone-workflow" });
    mutate({ name, description, definition });
    router.push("/workflows");
  };

  return (
    <div>
      {/* <Button
        disabled={isPending}
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <SaveIcon className="stroke-green-400" />
        Save copy
      </Button> */}
      <WorkflowFormDialog
        onSubmit={handleSubmit}
        title="Copy workflow"
        triggerText="Copy workflow"
        isPending={isPending}
      />
    </div>
  );
}

export default SaveAsButton;
