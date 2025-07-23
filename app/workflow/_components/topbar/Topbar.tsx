"use client";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";
import NavigationTabs from "./NavigationTabs";

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
  const pathname = usePathname();
  //console.log(workflowId);
  return (
    <header className="flex p-2 border-b-2 border-separate h-[60px] w-full sticky">
      <div className="flex gap-1 w-full justify-between">
        <div className="w-[340px] flex gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              if (pathname === ){
                //TODO: BASED ON THE ROUTE, DIFFERENT NAVIGATION
              }
              router.back();
            }}
          >
            <ChevronLeftIcon size={20}></ChevronLeftIcon>
          </Button>
          <div className="flex flex-col justify-center">
            <p className="font-bold text-ellipsis truncate ">{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate text-ellipsis">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <NavigationTabs workflowId={workflowId} />
        </div>
        <div className="flex gap-1 min-w-[160px] justify-end">
          {!hideButtons && (
            <>
              <ExecuteButton workflowId={workflowId}></ExecuteButton>
              <SaveButton workflowId={workflowId}></SaveButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
