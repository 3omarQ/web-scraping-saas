"use client";

import { GetExecutionPhaseDetails } from "@/actions/workflows/getExecutionPhaseDetails";
import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";
import {
  formatDistance,
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import {
  Calendar1Icon,
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  Divide,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import ParameterViewer from "./ParameterViewer";
import LogViewer from "./LogViewer";
import PhaseStatusBadge from "./PhaseStatusBadge";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecutionWithPhases>>;

function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>();

  const query = useQuery({
    queryKey: ["execution", initialData?.id],
    initialData,
    queryFn: () => GetWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    //while isRunnning we select it
    if (isRunning) {
      let phaseToSelect = query.data?.executionPhases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];
      setSelectedPhase(phaseToSelect?.id);
      return;
    } else {
      let phaseToSelect = query.data?.executionPhases.toSorted((a, b) =>
        a.completedAt! > b.completedAt! ? -1 : 1
      )[0];
      setSelectedPhase(phaseToSelect?.id);
      return;
    }
  }, [query.data?.executionPhases, isRunning, setSelectedPhase]);

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase != null,
    queryFn: () => GetExecutionPhaseDetails(selectedPhase!),
  });

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] border-r-2 border-separate flex flex-col overflow-hidden">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              query.data?.startedAt
                ? formatDistanceToNow(new Date(query.data?.startedAt), {
                    addSuffix: true,
                  })
                : "-"
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              query.data?.startedAt && query.data?.completedAt
                ? formatDistance(
                    new Date(query.data.startedAt),
                    new Date(query.data.completedAt),
                    { includeSeconds: true }
                  )
                : "-"
            }
          />
        </div>
        <Separator />
        <div className="flex justify-start items-center py-2 px-4">
          <div className="text-muted-foreground flex items-center gap-2">
            <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />

        <div className="overflow-auto h-full px-2 py-4">
          {query.data?.executionPhases.map((phase, index) => (
            <Button
              key={phase.id}
              className="w-full justify-between"
              variant={selectedPhase === phase.id ? "secondary" : "ghost"}
              onClick={() => {
                if (isRunning) {
                  return;
                }
                setSelectedPhase(phase.id);
              }}
            >
              <div className="flex items-center gap-2">
                <Badge variant={"outline"}>{index + 1}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <PhaseStatusBadge status={phase.status} />
            </Button>
          ))}
        </div>
      </aside>
      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in progress.. Please wait.</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-cold gap-2 justify-center h-full w-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Select a phase to view details
              </p>
            </div>
          </div>
        )}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge variant={"outline"} className="space-x-4">
                <div className="flex gap-1 items-center">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {phaseDetails.data.startedAt && phaseDetails.data.completedAt
                    ? `${
                        new Date(phaseDetails.data.completedAt).getTime() -
                        new Date(phaseDetails.data.startedAt).getTime()
                      }ms`
                    : "-"}
                </span>
              </Badge>
            </div>
            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJSON={phaseDetails.data.inputs}
            />
            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJSON={phaseDetails.data.outputs}
            />

            <LogViewer logs={phaseDetails.data.logs} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExecutionViewer;

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semibold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}
