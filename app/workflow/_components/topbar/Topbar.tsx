"use client";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";

function Topbar({
  title,
  subtitle,
  workflowId,
  hideButtons,
}: {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons: boolean;
}) {
  const router = useRouter();
  //console.log(workflowId);
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between h-[60px] w-full sticky">
      <div className="flex gap-1 flex-1">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeftIcon size={20}></ChevronLeftIcon>
        </Button>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-ellipsis truncate self-center">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
        {!hideButtons && (
          <div className="flex gap-1 flex-1 justify-end">
            <ExecuteButton workflowId={workflowId}></ExecuteButton>
            <SaveButton workflowId={workflowId}></SaveButton>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
