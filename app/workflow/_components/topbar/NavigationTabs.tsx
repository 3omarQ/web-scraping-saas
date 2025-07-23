"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, ListIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function NavigationTabs({ workflowId }: { workflowId: string }) {
  const pathname = usePathname();

  const currentTab = pathname.includes("/runs") ? "runs" : "editor";

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={currentTab}>
        <TabsList>
          <TabsTrigger value="editor" asChild>
            <Link
              href={`/workflow/editor/${workflowId}`}
              className="flex items-center px-6 gap-2"
            >
              <CodeIcon className="h-4 w-4" />
              Editor
            </Link>
          </TabsTrigger>
          <TabsTrigger value="runs" asChild>
            <Link
              href={`/workflow/runs/${workflowId}`}
              className="flex items-center px-6 gap-2"
            >
              <ListIcon className="h-4 w-4" />
              Runs
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default NavigationTabs;
