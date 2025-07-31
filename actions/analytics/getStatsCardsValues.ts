"use server";

import { prisma } from "@/lib/prisma";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMinute, startOfMonth } from "date-fns";

export async function GetStatsCardsValues(period: {
  year: number;
  month: number;
}) {
  const startDate = startOfMonth(new Date(period.year, period.month));
  const endDate = endOfMonth(new Date(period.year, period.month));
  const dateRange = { startDate, endDate };

  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const executions = await prisma.workflowExecution.findMany({
    where: {
      userId,
      startedAt: {
        gte: dateRange.startDate,
        lte: dateRange.endDate,
      },
      status: {
        in: [WorkflowExecutionStatus.FINISHED, WorkflowExecutionStatus.FAILED],
      },
    },
    select: {
      executionPhases: {
        where: {
          status: WorkflowExecutionStatus.FINISHED,
        },

        select: {
          id: true, // only fetch what's necessary
        },
      },
    },
  });

  const stats = {
    workflowExecutions: executions.length,
    phaseExecutions: 0,
  };

  stats.phaseExecutions = executions.reduce(
    (sum, execution) => sum + execution.executionPhases.length,
    0
  );

  return stats;
}
