"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { DEFAULT_USER_ID } from "@/lib/user";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

export async function GetWorkflowExecutionStats(period: {
  year: number;
  month: number;
}) {
  const dateFormat = "yyyy-MM-dd";

  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));
  const dateRange = { startDate, endDate };
  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId: DEFAULT_USER_ID,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
    },
  });

  const stats: Record<string, { success: number; failed: number }> =
    eachDayOfInterval({
      start: dateRange.startDate,
      end: dateRange.endDate,
    })
      .map((date) => format(date, "yyyy-MM-dd"))
      .reduce((acc, date) => {
        acc[date] = { success: 0, failed: 0 };
        return acc;
      }, {} as any);

  executions.forEach((execution: any) => {
    const date = format(execution.startedAt!, dateFormat);
    if (execution.status == WorkflowExecutionStatus.FINISHED) {
      stats[date].success += 1;
    }
    if (execution.status == WorkflowExecutionStatus.FAILED) {
      stats[date].failed += 1;
    }
  });

  const result = Object.entries(stats).map(([date, infos]) => ({
    date,
    ...infos,
  }));

  return result;
}
