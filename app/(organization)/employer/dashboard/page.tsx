import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMenuCard } from "../_components/DashboardMenuCard";
import { SquareChevronDown } from "lucide-react";
import { UpcomingInterviewSchedule } from "../_components/UpcomingInterviewCard";

export default function EmployerDashboardPage() {
  return (
    <section className="min-h-screen max-w-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-2">
        <div>
          <DashboardMenuCard />
        </div>
        <div>
          <UpcomingInterviewSchedule/>
        </div>
      </div>
    </section>
  );
}
