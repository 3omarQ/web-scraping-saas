"use client";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveButton from "./SaveButton";

function Topbar({ title, workflowId }: { title: string; workflowId: string }) {
  const router = useRouter();
  //console.log(workflowId);
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full sticky">
      <div className="flex gap-1 justify-between items-center w-full">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <div className="font-bold flex-1 text-ellipsis truncate self-center">
          Workflow: {title}
        </div>
        <div>
          <SaveButton workflowId={workflowId}></SaveButton>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
