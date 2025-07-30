import { GetWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import React from "react";
import ExecutionStatusChart from "./ExecutionStatusChart";

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: { year: number; month: number };
}) {
  const data = await GetWorkflowExecutionStats(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
}

export default StatsExecutionStatus;
