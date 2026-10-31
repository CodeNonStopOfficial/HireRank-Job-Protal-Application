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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", applications: 186, interviews: 80 },
  { month: "Feb", applications: 305, interviews: 200 },
  { month: "Mar", applications: 237, interviews: 120 },
  { month: "Apr", applications: 273, interviews: 190 },
  { month: "May", applications: 209, interviews: 130 },
  { month: "Jun", applications: 314, interviews: 180 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "#2563eb",
  },
  interviews: {
    label: "Interviews",
    color: "#10b981",
  },
} satisfies ChartConfig;

export function BarChartComponentDashbaord() {
  return (
    <div className="w-full rounded-2xl border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-lg font-bold tracking-tight">
          Recruitment Overview
        </h2>

        <p className="text-sm text-muted-foreground">
          Applications and interviews over the last six months
        </p>
      </div>

      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="h-75 w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -15,
            bottom: 0,
          }}
          barGap={8}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-border"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 12 }}
            allowDecimals={false}
          />

          <ChartTooltip
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
            content={<ChartTooltipContent />}
          />

          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="bottom"
          />

          <Bar
            dataKey="applications"
            fill="var(--color-applications)"
            radius={[5, 5, 0, 0]}
            maxBarSize={32}
          />

          <Bar
            dataKey="interviews"
            fill="var(--color-interviews)"
            radius={[5, 5, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
