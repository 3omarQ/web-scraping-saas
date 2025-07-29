import { GetPeriods } from "@/actions/analytics/getPeriods";
import React, { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import { CirclePlayIcon } from "lucide-react";
import StatsCard from "./_components/StatsCard";

function HomePage({
  searchParams,
}: {
  searchParams: { month?: string; year?: string };
}) {
  const currentDate = new Date();
  const { month, year } = searchParams;
  const period: { month: number; year: number } = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Home</h1>
        <Suspense
          fallback={<Skeleton className="w-[180px] h-[40px]"></Skeleton>}
        >
          <PeriodSelectorWrapper
            selectedPeriod={period}
          ></PeriodSelectorWrapper>
        </Suspense>
      </div>
      <StatsCards selectedPeriod={period} />
    </div>
  );
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: { year: number; month: number };
}) {
  const periods = await GetPeriods();
  return (
    <PeriodSelector
      periods={periods}
      selectedPeriod={selectedPeriod}
    ></PeriodSelector>
  );
}

async function StatsCards({
  selectedPeriod,
}: {
  selectedPeriod: { year: number; month: number };
}) {
  const data = await GetStatsCardsValues(selectedPeriod);
  return (
    <div>
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecutions}
        icon={CirclePlayIcon}
      ></StatsCard>
    </div>
  );
}

export default HomePage;
