"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, ListIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function NavigationTabs({ workflowId }: { workflowId: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname.includes("/runs") ? "runs" : "editor";

  const handleTabChange = (value: string) => {
    const target =
      value === "runs"
        ? `/workflow/runs/${workflowId}`
        : `/workflow/editor/${workflowId}`;

    if (pathname !== target) {
      router.replace(target); // replaces current history entry
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="editor" className="flex items-center px-6 gap-2">
            <CodeIcon className="h-4 w-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="runs" className="flex items-center px-6 gap-2">
            <ListIcon className="h-4 w-4" />
            Runs
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default NavigationTabs;
