import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarDays, Clock3, Video, SquareChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function UpcomingInterviewSchedule() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
        <CardTitle className="flex items-center gap-3 text-lg font-bold">
          <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600">
            <SquareChevronDown className="size-5" />
          </div>

          <span>Upcoming Interview Schedule</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Interview Item */}
        <div className="rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Interview Details */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  Software Engineer Interview
                </h3>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  Upcoming
                </span>
                <Button className="gap-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  <Video className="size-4" />
                  Join Interview
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  Nov 03, 2026
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 className="size-4" />
                  10:30 AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Interview */}
        <div className="rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  UI/UX Designer Interview
                </h3>

                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
                  Scheduled
                </span>
                <Button variant="outline" className="gap-2 rounded-lg">
                  View Details
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  Nov 05, 2026
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 className="size-4" />
                  02:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
