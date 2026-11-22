
import { requireJobSeeker } from "@/app/utils/requiredJobSekeer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BriefcaseBusiness, Search } from "lucide-react";

export default async function CandidateDashboard() {
  const session = await requireJobSeeker();

  const userName = session?.name?.trim().split(/\s+/)[0] || "there";

  return (
    <section className="space-y-6 p-4 sm:py-6">

      {/* Welcome Section */}
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <h1 className="text-2xl font-bold capitalize sm:text-3xl">
          Welcome Back, {userName}!
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your next opportunity is just a click away.
        </p>

        {/* Search Jobs */}
        <div className="mt-5 flex w-full max-w-xl gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              className="h-11 pl-10"
              placeholder="Find jobs and apply..."
            />
          </div>

          <Button className="h-11 px-5">
            Search
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-primary/10 p-3">
              <BriefcaseBusiness className="size-6 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Applications
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                12
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-green-500/10 p-3">
              <BriefcaseBusiness className="size-6 text-green-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Shortlisted
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                4
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <BriefcaseBusiness className="size-6 text-blue-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Interviews
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                2
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-red-500/10 p-3">
              <BriefcaseBusiness className="size-6 text-red-500" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Not Selected
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                6
              </h2>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
         <div>
             <h1>Recent Applications</h1>
         </div>
      </div>
    </section>
  );
}
