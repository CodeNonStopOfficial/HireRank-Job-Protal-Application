import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMenuCard } from "../_components/DashboardMenuCard";
import { SquareChevronDown } from "lucide-react";
import { UpcomingInterviewSchedule } from "../_components/UpcomingInterviewCard";
import { BarChartComponentDashbaord } from "@/components/company/BarChartComponetDashboard";
import { InterviewActivityChart } from "@/components/company/InterviewActivityChart";
import { JobsByCategoryChart } from "@/components/company/JobsByCategoryChart";
import { ApplicationStatusChart } from "@/components/company/ApplicationStatusChart";

export default function EmployerDashboardPage() {
  return (
    <section className="min-h-screen max-w-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-2">
        <div className="space-y-2 flex flex-col gap-2 justify-start items-start">
          <DashboardMenuCard />
          <BarChartComponentDashbaord />
          <InterviewActivityChart/>
          <JobsByCategoryChart/>
        </div>
        <div>
          <UpcomingInterviewSchedule />
          <ApplicationStatusChart/>
        </div>
      </div>
    </section>
  );
}
