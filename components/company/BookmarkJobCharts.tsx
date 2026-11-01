"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bookmark,
  BriefcaseBusiness,
  ChartNoAxesCombined,
} from "lucide-react";

interface BookmarkChartItem {
  createdAt: string;
  job: {
    employmentType: string;
    workplaceType: string;
  };
}

interface BookmarkJobChartsProps {
  data: BookmarkChartItem[];
}



const CHART_COLORS = [
  "#2563EB", // Blue
  "#16A34A", // Green
  "#60A5FA", // Light Blue
  "#22C55E", // Light Green
  "#1D4ED8", // Dark Blue
];

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function BookmarkJobCharts({ data }: BookmarkJobChartsProps) {
  // Group bookmarks by employment type.
  const employmentMap = new Map<string, number>();

  data.forEach((bookmark) => {
    const type = bookmark.job.employmentType || "Other";

    employmentMap.set(type, (employmentMap.get(type) ?? 0) + 1);
  });

  const employmentData = Array.from(employmentMap, ([type, count]) => ({
    name: formatLabel(type),
    jobs: count,
  })).sort((a, b) => b.jobs - a.jobs);

  // Group bookmarks by workplace type.
  const workplaceMap = new Map<string, number>();

  data.forEach((bookmark) => {
    const type = bookmark.job.workplaceType || "Other";

    workplaceMap.set(type, (workplaceMap.get(type) ?? 0) + 1);
  });

  const workplaceData = Array.from(workplaceMap, ([type, count]) => ({
    name: formatLabel(type),
    value: count,
  }));

  // Bookmarks saved over the last 7 days.
  const today = new Date();
  const dateMap = new Map<string, number>();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    dateMap.set(key, 0);
  }

  data.forEach((bookmark) => {
    const date = new Date(bookmark.createdAt);

    if (Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    if (dateMap.has(key)) {
      dateMap.set(key, (dateMap.get(key) ?? 0) + 1);
    }
  });

  const activityData = Array.from(dateMap, ([date, bookmarks]) => ({
    date,
    day: new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
    }),
    bookmarks,
  }));

  const totalBookmarks = data.length;
  const employmentTypes = employmentData.length;
  const workplaceTypes = workplaceData.length;

  if (totalBookmarks === 0) {
    return (
      <Card className="rounded-2xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
            <Bookmark className="size-7 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">No Bookmark Analytics Yet</h3>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Bookmark some jobs to see employment types, workplace
            preferences, and your bookmarking activity here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bookmark className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Bookmarks
              </p>
              <h3 className="text-2xl font-bold">{totalBookmarks}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <BriefcaseBusiness className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Employment Types
              </p>
              <h3 className="text-2xl font-bold">{employmentTypes}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <ChartNoAxesCombined className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Workplace Types
              </p>
              <h3 className="text-2xl font-bold">{workplaceTypes}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookmark Activity Chart */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Bookmark Activity
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Jobs bookmarked during the last 7 days
          </p>
        </CardHeader>

        <CardContent>
          <div className="h-65 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="bookmarkGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-border"
                />

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "#16A34A",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [value, "Bookmarks"]}
                  labelFormatter={(label, payload) =>
                    payload?.[0]?.payload?.date ?? label
                  }
                />

                <Area
                  type="monotone"
                  dataKey="bookmarks"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2.5}
                  fill="#2563EB"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Employment and Workplace Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Employment Type */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Bookmarks by Employment Type
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              See which job types you save most often.
            </p>
          </CardHeader>

          <CardContent>
            {employmentData.length > 0 ? (
              <div className="h-70 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={employmentData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      className="stroke-border"
                    />

                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                      interval={0}
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                      cursor={{ fill: "#0000" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #16A34A",
                        backgroundColor: "#ffff",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [value, "Saved Jobs"]}
                    />

                    <Bar
                      dataKey="jobs"
                      name="Saved Jobs"
                      fill="#2563EB"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No employment type data available.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Workplace Type */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Bookmarks by Workplace
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Distribution of saved workplace preferences.
            </p>
          </CardHeader>

          <CardContent>
            {workplaceData.length > 0 ? (
              <>
                <div className="relative h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={workplaceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={62}
                        outerRadius={92}
                        paddingAngle={4}
                        stroke="none"
                      >
                        {workplaceData.map((item, index) => (
                          <Cell
                            key={item.name}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid hsl(var(--border))",
                          backgroundColor: "hsl(var(--background))",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [value, "Saved Jobs"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">
                      {totalBookmarks}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Bookmarks
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-3">
                  {workplaceData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            CHART_COLORS[index % CHART_COLORS.length],
                        }}
                      />

                      <span className="text-muted-foreground">
                        {item.name}
                      </span>

                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No workplace type data available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}