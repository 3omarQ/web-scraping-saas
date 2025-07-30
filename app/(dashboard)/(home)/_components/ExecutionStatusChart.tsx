"use client";
import { GetWorkflowExecutionStats } from "@/actions/analytics/getWorkflowExecutionStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Layers2Icon } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>;
const chartConfig = {
  success: {
    label: "Success",
    color: "hsl(var(--chart-2))",
  },
  failed: { label: "Failed", color: "hsl(var(--chart-1))" },
};

function ExecutionStatusChart({ data }: { data: ChartData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Layers2Icon className="w-6 h-6 text-primary"></Layers2Icon>
          Workflow execution status
        </CardTitle>
        <CardDescription>
          Daily number of successful and failed workflow executions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <BarChart
            data={data}
            height={200}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            barCategoryGap={"20%"}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              type="number"
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip />
            <Bar dataKey="success" fill="var(--color-success)" barSize={20} />
            <Bar dataKey="failed" fill="var(--color-failed)" barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ExecutionStatusChart;
