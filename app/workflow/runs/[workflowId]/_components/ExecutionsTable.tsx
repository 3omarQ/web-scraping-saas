"use client";

import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDate, formatDistance, formatDistanceToNow } from "date-fns";
import React from "react";
import PhaseStatusBadge from "../[executionId]/_components/PhaseStatusBadge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type initialData = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

function ExecutionsTable({
  workflowId,
  initialData,
}: {
  workflowId: string;
  initialData: initialData;
}) {
  const query = useQuery({
    initialData,
    queryKey: [workflowId, "executions"],
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  });
  const router = useRouter();
  return (
    <div className="border rounded-lg shadow-md overflow-auto">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead className="flex w-full justify-center items-center">
              Status
            </TableHead>
            <TableHead className="">Started at (desc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {query.data.map((execution) => {
            const duration =
              new Date(execution.completedAt!).getTime() -
              new Date(execution.startedAt!).getTime() +
              "ms";

            const startedAtFormatted = formatDistanceToNow(
              execution.startedAt!,
              { addSuffix: true }
            );
            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`);
                }}
              >
                <TableCell className="max-w-[70px] truncate whitespace-nowrap overflow-hidden">
                  <div className="   flex items-center gap-2">
                    <span className="truncate">{execution.id}</span>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        navigator.clipboard.writeText(execution.id);
                        toast.success("Copied ID to clipboard");
                      }}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <CopyIcon size={14} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="flex gap-1 flex-col w-full justify-center items-center">
                  <div className="flex items-center justify-center">
                    <PhaseStatusBadge
                      extraParams=" !capitalize text-md"
                      status={execution.status}
                    ></PhaseStatusBadge>
                  </div>
                  <div className="text-xs flex items-center justify-center text-muted-foreground">
                    {duration}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {startedAtFormatted}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExecutionsTable;
