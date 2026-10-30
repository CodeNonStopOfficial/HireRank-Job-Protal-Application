import {
  getDataPublicJobTypeArray,
} from "@/app/services/candidata/get-public-jobpost";
import {buttonVariants } from "@/components/ui/button";
import {JobCardComponent} from "./CardJobComponent"
import Link from "next/link";

interface iAppPros {
  jobs: getDataPublicJobTypeArray;
  intern: getDataPublicJobTypeArray;
}

export function JobProjectCardSection({ jobs, intern }: iAppPros) {
  return (
    <div className="max-w-full px-4 py-4 md:px-8 lg:px-11 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
        <div className="max-w-full space-y-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Latest Job</h1>
              <p>Explore Latest job and apply for your dream jobs</p>
            </div>
            <div>
              <Link
                href="/get-started"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "px-4 py-4.3 underline text-primary hover:text-primary/20",
                })}
              >
                View All
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {jobs.map((data) => (
              <div key={data.id} className="flex flex-col gap-2">
                <JobCardComponent jobs={data} />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-full space-y-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Latest Intern</h1>
              <p>Explore Latest job and apply for your dream jobs</p>
            </div>
            <div>
              <Link
                href="/get-started"
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "px-4 py-4.3 underline text-primary hover:text-primary/20",
                })}
              >
                View All
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            {intern.map((data) => (
              <div key={data.id} className="flex flex-col gap-2">
                <JobCardComponent jobs={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


