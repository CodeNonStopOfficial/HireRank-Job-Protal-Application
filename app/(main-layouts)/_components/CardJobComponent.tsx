"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Clock,
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { getDataPublicJobType } from "@/app/services/candidata/get-public-jobpost";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookmarkButton } from "@/components/common/BookMarkButton";
interface iAppPross {
  jobs: getDataPublicJobType;
}

export function JobCardComponent({ jobs}: iAppPross) {
  const formatSalary = () => {
    if (jobs.salaryMin == null && jobs.salaryMax == null) {
      return null;
    }

    const formatAmount = (amount: number) =>
      new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(amount);

    if (jobs.salaryMin != null && jobs.salaryMax != null) {
      return `${jobs.salaryCurrency}${formatAmount(jobs.salaryMin)} - ${
        jobs.salaryCurrency
      }${formatAmount(jobs.salaryMax)}`;
    }

    const amount = jobs.salaryMin ?? jobs.salaryMax;

    return amount != null
      ? `${jobs.salaryCurrency}${formatAmount(amount)}`
      : null;
  };

  const salary = formatSalary();

  return (
    <Card>
      <CardContent>
        <div className="w-full rounded px-4 py-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-start gap-2">
              <Image
                src={jobs.company.logo}
                alt="logo"
                width={54}
                height={54}
                className="border px-2 h-13 py-2 rounded-2xl object-cover"
              />
              <div>
                <Link
                  href={`/get-started/${jobs.id}`}
                  className="inline-flex items-center gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <h2 className="text-lg font-bold tracking-tight transition-colors hover:text-primary sm:text-xl">
                    {jobs.title}
                  </h2>
                  <ArrowUpRight className="size-4 font-bold text-primary" />
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-secondary-foreground">
                    {jobs.company.name}
                  </span>
                  <span className="flex flex-row gap-1 justify-start  items-center text-center">
                    <MapPin className="size-4 text-primary" /> {jobs.location}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-green-800">
              {/* <Bookmark /> */}
              <BookmarkButton jobId={jobs.id} initialBookmarked={jobs.isBookmarked as boolean}/>
            </span>
          </div>
          <div className="py-4">
            {/* Job details */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium capitalize">
                <BriefcaseBusiness className="size-3.5" />
                {jobs.workplaceType}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium capitalize">
                <Clock3 className="size-3.5" />
                {jobs.employmentType}
              </span>

              {salary && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Wallet className="size-3.5" />
                  {salary}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pl-2">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-4 shrink-0 text-primary" />
              {new Date(jobs.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <Link
              href={`/get-started/apply-job/${jobs.id}`}
              className={buttonVariants({
                variant: "default",
                className: "px-8 py-4",
              })}
            >
              Apply
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
