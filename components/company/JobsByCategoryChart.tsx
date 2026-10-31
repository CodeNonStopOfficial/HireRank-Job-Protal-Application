"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { BriefcaseBusiness } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetJobDataByCategoryChartType } from "@/app/services/employer/getchart-jobdata";



interface iAppPros {
    chartData : GetJobDataByCategoryChartType
}[]
const chartConfig = {
  jobs: {
    label: "Jobs",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function JobsByCategoryChart({chartData}:iAppPros) {
  const totalJobs = chartData.reduce(
    (total, item) => total + item.jobs,
    0
  );

  return (
    <Card className="rounded-2xl border-border/60 shadow-sm w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">
            Jobs by Category
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Distribution of available job openings
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
          <BriefcaseBusiness className="size-5" />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="mb-5">
          <h3 className="text-3xl font-bold tracking-tight">
            {totalJobs}
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Total available jobs across categories
          </p>
        </div>

        <ChartContainer
          config={chartConfig}
          className="h-70 w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border"
            />

            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 7, fontWeight: 500 }}
              interval={0}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />

            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Bar
              dataKey="jobs"
              fill="var(--color-jobs)"
              radius={[6, 6, 0, 0]}
              maxBarSize={42}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}