"use client";

import { JobDescriptionDataType } from "@/app/services/candidata/get-jobdetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  BriefcaseBusiness,
  Clock,
  Banknote,
  Users,
  Building2,
  Globe,
  ArrowUpRight,
  CheckCircle2,
  CalendarDays,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JsonToHtml } from "@/components/tiptap/JsonTiptapContent";

interface iAppProps {
  data: JobDescriptionDataType;
}

export function JobDescriptionComponent({ data }: iAppProps) {
  const job = data.data || null;

  if (!job) {
    return (
      <div className="flex min-h-100 items-center justify-center px-4">
        <Card className="w-full max-w-md border-dashed">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <BriefcaseBusiness className="mb-4 size-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Job not found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This job may have been removed or is no longer available.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const company = job.company;

  const salary = `${job.salaryCurrency ?? "USD"} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`;

  const salaryPeriod = job.salaryPeriod
    ? ` / ${job.salaryPeriod.toLowerCase()}`
    : "";

  const formattedDate = job.publishedAt
    ? new Date(job.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-muted/30 rounded-2xl">
      <div className="mx-auto max-w-full">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Jobs</span>
          <span>/</span>
          <span className="truncate text-foreground">{job.title}</span>
        </div>

        {/* Job Header */}
        <Card className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="h-2 bg-primary" />

          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Company Logo */}
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted sm:size-24">
                {company.logo ? (
                  <Image
                    src={company.logo}
                    width={96}
                    height={96}
                    alt={`${company.name} logo`}
                    className="size-full object-contain p-2 rounded-2xl"
                  />
                ) : (
                  <Building2 className="size-10 text-muted-foreground" />
                )}
              </div>

              {/* Job Details */}
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    {job.department ?? "General"}
                  </Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 className="mr-1 size-3" />
                    Published
                  </Badge>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Building2 className="size-4 text-primary" />
                    {company.name}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    {job.location}
                  </span>

                  {formattedDate && (
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4 text-primary" />
                      Posted {formattedDate}
                    </span>
                  )}
                </div>

                {/* Job Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-lg px-3 py-1.5">
                    <BriefcaseBusiness className="mr-2 size-4" />
                    {job.employmentType.replaceAll("_", " ")}
                  </Badge>

                  <Badge variant="outline" className="rounded-lg px-3 py-1.5">
                    <Building2 className="mr-2 size-4" />
                    {job.workplaceType.replaceAll("_", " ")}
                  </Badge>

                  <Badge variant="outline" className="rounded-lg px-3 py-1.5">
                    <Clock className="mr-2 size-4" />
                    {job.experienceLevel.replaceAll("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job Overview */}
            <Card className="rounded-2xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Job Overview</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <OverviewItem
                    icon={<Banknote className="size-5" />}
                    label="Salary"
                    value={`${salary}${salaryPeriod}`}
                  />

                  <OverviewItem
                    icon={<BriefcaseBusiness className="size-5" />}
                    label="Employment Type"
                    value={job.employmentType.replaceAll("_", " ")}
                  />

                  <OverviewItem
                    icon={<Clock className="size-5" />}
                    label="Experience Level"
                    value={job.experienceLevel.replaceAll("_", " ")}
                  />

                  <OverviewItem
                    icon={<Users className="size-5" />}
                    label="Open Positions"
                    value={`${job.openings} ${job.openings === 1 ? "position" : "positions"}`}
                  />

                  <OverviewItem
                    icon={<MapPin className="size-5" />}
                    label="Location"
                    value={job.location}
                  />

                  <OverviewItem
                    icon={<Building2 className="size-5" />}
                    label="Workplace"
                    value={job.workplaceType.replaceAll("_", " ")}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="rounded-2xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">About This Role</CardTitle>
              </CardHeader>

              <CardContent>
                {job.description ? (
                  <div className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    <JsonToHtml json={JSON.parse(job.description)} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No job description has been provided.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="rounded-2xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Requirements</CardTitle>
              </CardHeader>

              <CardContent>
                {job.requirements ? (
                  <div className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    <JsonToHtml json={JSON.parse(job.requirements)} />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specific requirements have been provided.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="rounded-2xl border bg-background shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Benefits & Perks</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {job.benefits.map((benefit, index) => (
                      <div
                        key={index + 1}
                        className="flex items-start gap-3 rounded-xl border p-4"
                      >
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            <div>
              {job.skills && job.skills.length > 0 && (
                <Card className="rounded-2xl border bg-background shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">Tack Stack</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {job.skills.map((skills, index) => (
                        <div
                          key={index + 1}
                          className="flex items-start gap-3 rounded-xl border p-4"
                        >
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span className="text-sm font-medium">{skills}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            {/* Application Card */}
            <Card className="overflow-hidden rounded-2xl border bg-background shadow-sm">
              <div className="h-1.5 bg-primary" />

              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Offered Compensation
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {salary}
                </p>

                {salaryPeriod && (
                  <p className="text-sm text-muted-foreground">
                    {salaryPeriod.replace(" / ", "per ")}
                  </p>
                )}

                <div className="my-6 border-t" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-right font-medium">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Job type</span>
                    <span className="text-right font-medium">
                      {job.employmentType.replaceAll("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Openings</span>
                    <span className="font-medium">{job.openings}</span>
                  </div>
                </div>

                <div>
                  <Link
                    href={`apply-job/${job.id}`}
                    className={buttonVariants({
                      variant: "default",
                      className:
                        "px-4 py-4.5 flex items-center gap-2 w-full mt-4",
                    })}
                  >
                    Apply for this Job
                    <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </div>

                <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                  Review the job details before submitting your application.
                </p>
              </CardContent>
            </Card>

            {/* Company Card */}
            <Card className="rounded-2xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">About the Company</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        width={48}
                        height={48}
                        alt={`${company.name} logo`}
                        className="size-full object-contain p-1"
                      />
                    ) : (
                      <Building2 className="size-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{company.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {company.location}
                    </p>
                  </div>
                </div>

                {company.about && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                    {company.about}
                  </p>
                )}

                <div className="">
                  {company.website && (
                    <Link
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        className: "px-4 py-4.5 flex items-center mt-2 w-full",
                      })}
                    >
                      <Globe className="mr-2 size-4" />
                      Visit Website
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function OverviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 wrap-break-word font-semibold capitalize">{value}</p>
      </div>
    </div>
  );
}
