"use client";

import {
  Area,
  AreaChart,
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

import { CalendarDays, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { day: "Mon", interviews: 3 },
  { day: "Tue", interviews: 5 },
  { day: "Wed", interviews: 2 },
  { day: "Thu", interviews: 7 },
  { day: "Fri", interviews: 4 },
  { day: "Sat", interviews: 6 },
  { day: "Sun", interviews: 8 },
];

const chartConfig = {
  interviews: {
    label: "Interviews",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function InterviewActivityChart() {
  const totalInterviews = chartData.reduce(
    (total, item) => total + item.interviews,
    0
  );

  return (
    <Card className=" w-full wrounded-2xl border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">
            Interview Activity
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Scheduled interviews over the last 7 days
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
          <CalendarDays className="size-5" />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">
              {totalInterviews}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Total interviews this week
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="size-3.5" />
            Weekly activity
          </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="h-60 w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="interviewGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--color-interviews)"
                  stopOpacity={0.3}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-interviews)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              type="monotone"
              dataKey="interviews"
              stroke="var(--color-interviews)"
              strokeWidth={3}
              fill="url(#interviewGradient)"
              fillOpacity={1}
              dot={{
                r: 4,
                fill: "var(--color-interviews)",
                strokeWidth: 2,
                stroke: "var(--background)",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}