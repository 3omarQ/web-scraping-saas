"use client";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { ChevronLeftIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";
import NavigationTabs from "./NavigationTabs";
import PublishButton from "./PublishButton";
import UnPublishButton from "./UnPublishButton";
import { EditorMode } from "@/types/editorMode";
import Link from "next/link";
import ShareButton from "./ShareButton";
import SaveAsButton from "./SaveAsButton";

function Topbar({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  isPublished = false,
  editorMode,
}: {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons: boolean;
  isPublished?: boolean;
  editorMode: EditorMode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="flex p-2 border-b-2 border-separate min-h-[60px] w-full sticky">
      <div className="flex gap-1 w-full justify-between">
        {/* Left section */}
        <div className="w-[340px] flex gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              if (
                pathname.startsWith("/workflow/editor") ||
                pathname.startsWith("/workflow/shared")
              ) {
                router.push("/workflows");
              } else {
                router.back();
              }
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

        {/* Center nav tabs */}
        {editorMode == EditorMode.OWNER && (
          <div className="flex w-full justify-center items-center">
            <NavigationTabs workflowId={workflowId} />
          </div>
        )}

        {/* Right section: buttons */}
        <div className="flex min-w-[200px] gap-1 flex-1 justify-end">
          {editorMode === EditorMode.OWNER && !hideButtons && (
            <>
              <ExecuteButton workflowId={workflowId} />
              {isPublished ? (
                <>
                  <ShareButton workflowId={workflowId} />
                  <UnPublishButton workflowId={workflowId} />
                </>
              ) : (
                <>
                  <SaveButton workflowId={workflowId} />
                  <PublishButton workflowId={workflowId} />
                </>
              )}
            </>
          )}

          {editorMode === EditorMode.VIEWER_LOGGED_IN && !hideButtons && (
            <SaveAsButton></SaveAsButton>
          )}

          {editorMode === EditorMode.VIEWER_ANON && !hideButtons && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserIcon size={14} />
              Viewing shared workflow
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
