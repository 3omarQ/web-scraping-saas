// components/modals/ShareModal.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function ShareModal({
  open,
  onOpenChange,
  publicUrl,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  publicUrl: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Public Link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="flex-1 px-2 py-1 border rounded text-sm"
          />
          <Button size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-1" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
