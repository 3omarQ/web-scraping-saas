"use server";

import { prisma } from "@/lib/prisma";
import { DEFAULT_USER_ID } from "@/lib/user";

export async function GetPeriods() {
  const years = await prisma.workflowExecution.aggregate({
    where: { userId: DEFAULT_USER_ID },
    _min: { startedAt: true },
  });
  const currentYear = new Date().getFullYear();
  const minYear = years._min.startedAt
    ? years._min.startedAt.getFullYear()
    : currentYear;

  const periods = [];

  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month <= 11; month++) {
      periods.push({ year, month });
    }
  }
  return periods;
}
