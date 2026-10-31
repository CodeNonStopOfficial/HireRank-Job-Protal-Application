"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";

import { Users } from "lucide-react";

const chartData = [
  { status: "Pending", applications: 32, fill: "#f59e0b" },
  { status: "Reviewed", applications: 24, fill: "#3b82f6" },
  { status: "Shortlisted", applications: 18, fill: "#8b5cf6" },
  { status: "Accepted", applications: 14, fill: "#10b981" },
  { status: "Rejected", applications: 12, fill: "#ef4444" },
];

const chartConfig = {
  applications: {
    label: "Applications",
  },
} satisfies ChartConfig;

const totalApplications = chartData.reduce(
  (total, item) => total + item.applications,
  0
);

export function ApplicationStatusChart() {
  return (
    <Card className="h-fit mt-2 rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="size-5 text-blue-600" />
          Application Status
        </CardTitle>

        <CardDescription>
          Illustrative breakdown of job application statuses.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 items-center gap-6">
          {/* Donut chart */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-57.5 w-full max-w-70"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="applications"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {chartData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={item.fill}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `${value} applications`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Center total and status legend */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-muted-foreground">
                Total Applications
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight">
                {totalApplications}
              </p>
            </div>

            <div className="space-y-3">
              {chartData.map((item) => {
                const percentage = Math.round(
                  (item.applications / totalApplications) * 100
                );

                return (
                  <div
                    key={item.status}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />

                      <span className="text-sm text-muted-foreground">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {item.applications}
                      </span>

                      <span className="w-10 text-right text-xs text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}