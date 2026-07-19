"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

export async function GetWorkflowExecutionStats(period: {
  year: number;
  month: number;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }
  const dateFormat = "yyyy-MM-dd";

  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));
  const dateRange = { startDate, endDate };
  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
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
