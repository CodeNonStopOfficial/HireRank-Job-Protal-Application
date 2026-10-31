"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  ArrowUpRight,
  Badge,
  User2Icon,
  StarCheckIcon,
  AirplayIcon,
} from "lucide-react";

const dashboardArrayMenu = [
  {
    lableIcon: Badge,
    jobs: 12,
    new_jobs: 2,
    title: "Active Jobs",
  },
  {
    lableIcon: User2Icon,
    jobs: 1245,
    new_jobs: 458,
    title: "Total Applicants",
  },
  {
    lableIcon: StarCheckIcon,
    jobs: 1289,
    new_jobs: 284,
    title: "Ai-Qualified Candidates",
  },
   {
    lableIcon: AirplayIcon,
    jobs: 1289,
    new_jobs: 284,
    title: "Applyed Candidates",
  },
];

export function DashboardMenuCard() {
  return (
    <>
      <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {dashboardArrayMenu.map((data,index) => (
          <Card key={index +1} className="group w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <data.lableIcon className="size-6" strokeWidth={1.8} />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="size-3.5" />
                  +{data.new_jobs}
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {data.title}
                </p>

                <div className="flex items-baseline gap-2 mb-1">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {data.jobs}
                  </h2>
                </div>
              </div>

              <div className=" flex items-center gap-2 border-t border-border/60 pt-3">
                <span className="size-2 rounded-full bg-emerald-500" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-emerald-600">
                    + {data.new_jobs}
                  </span>{" "}
                  added this week
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
