import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { ShareWorkflow } from "@/actions/workflows/shareWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { id } from "date-fns/locale";
import { BookPlus, PlayIcon, Share, UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ShareModal from "../dialogs/ShareDialog";

function ShareButton({ workflowId }: { workflowId: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);
  const shareMutation = useMutation({
    mutationFn: ShareWorkflow,
    onSuccess: (data) => {
      toast.success("Created public link", { id: workflowId });
      setPublicId(data.publicId);
      setModalOpen(true);
    },

    onError: (error) =>
      toast.error(error?.message || "Something went wrong while sharing the workflow", {
        id: workflowId,
      }),
  });

  return (
    <div>
      <Button
        disabled={shareMutation.isPending}
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={() => {
          toast.loading("Sharing workflow...", { id: workflowId });
          shareMutation.mutate({
            id: workflowId,
          });
        }}
      >
        <Share className="stroke-green-400"></Share>
        Share
      </Button>
      {publicId && (
        <ShareModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          publicUrl={`${process.env.NEXT_PUBLIC_APP_URL}/workflow/shared/${publicId}`}
        />
      )}
    </div>
  );
}

export default ShareButton;
//TODO: fix problem where the pop up dialog shows twice
