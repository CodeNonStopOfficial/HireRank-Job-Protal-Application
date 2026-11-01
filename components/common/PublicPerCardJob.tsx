import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { getDataPublicJobType } from "@/app/services/candidata/get-public-jobpost";
import {
  MapPin,
  User2,
  BriefcaseBusiness,
  Clock3,
  Wallet,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { buttonVariants } from "../ui/button";
import { BookmarkButton } from "./BookMarkButton";

interface iAppPros {
  data: getDataPublicJobType;
}

export function PublicPerCardJobComponent({ data }: iAppPros) {
  const formatSalary = () => {
    if (data.salaryMin == null && data.salaryMax == null) {
      return null;
    }

    const formatAmount = (amount: number) =>
      new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
      }).format(amount);

    if (data.salaryMin != null && data.salaryMax != null) {
      return `${data.salaryCurrency}${formatAmount(data.salaryMin)} - ${
        data.salaryCurrency
      }${formatAmount(data.salaryMax)}`;
    }

    const amount = data.salaryMin ?? data.salaryMax;

    return amount != null
      ? `${data.salaryCurrency}${formatAmount(amount)}`
      : null;
  };

  const salary = formatSalary();

  return (
    <Card className="group relative h-full overflow-hidden rounded-xl border-border/70 bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Company logo */}
            <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted sm:size-12">
              {data.company.logo ? (
                <Image
                  src={data.company.logo}
                  alt={`${data.company.name} logo`}
                  width={48}
                  height={48}
                  className="size-full object-cover"
                />
              ) : (
                <User2 className="size-5 text-muted-foreground" />
              )}
            </div>

            {/* Job title and company */}
            <div className="min-w-0 flex-1">
              <Link
                href={`/get-started/${data.id}`}
                className="group/title inline-flex max-w-full items-start gap-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <h2 className="line-clamp-2 text-sm font-semibold leading-5 transition-colors group-hover/title:text-primary sm:text-base">
                  {data.title}
                </h2>

                <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-90 transition-opacity group-hover/title:opacity-100" />
              </Link>

             <div className="flex items-center gap-2 ">
               <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                {data.company.name}
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{data.location}</span>
              </p>
             </div>
            </div>

            {/* Bookmark */}
            <div className="shrink-0">
              <BookmarkButton
                jobId={data.id}
                initialBookmarked={data.isBookmarked ?? false}
              />
            </div>
          </div>

          {/* Job details */}
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-1 text-[11px] font-medium capitalize sm:text-xs">
              <BriefcaseBusiness className="size-3 text-primary" />
              {data.workplaceType}
            </span>

            <span className="inline-flex items-center gap-1 rounded-md border bg-muted/40 px-2 py-1 text-[11px] font-medium capitalize sm:text-xs">
              <Clock3 className="size-3 text-primary" />
              {data.employmentType}
            </span>

            {salary && (
              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 sm:text-xs">
                <Wallet className="size-3" />
                {salary}
              </span>
            )}
          </div>

          {/* Company description */}
          {data.company.about && (
            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
              {data.company.about}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
              <Clock className="size-3.5 shrink-0 text-primary" />
              {new Date(data.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <Link
              href={`/get-started/apply-job/${data.id}`}
              className={buttonVariants({
                size: "sm",
                className: "h-8 gap-1.5 px-3 text-xs",
              })}
            >
              Apply Now
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
