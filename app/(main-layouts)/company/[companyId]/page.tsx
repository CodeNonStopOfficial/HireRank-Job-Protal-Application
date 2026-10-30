import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, MapPin, BriefcaseBusiness } from "lucide-react";

import { getAllCompanyById } from "@/app/services/candidata/get-allcompanybyid";
import { JobCardComponent } from "../../_components/CardJobComponent";
import { Suspense } from "react";
import Link from "next/link";

interface CompanyPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function CompanyPageById({ params }: CompanyPageProps) {
  const { companyId } = await params;

  const data = await getAllCompanyById(companyId);

  // Get single company
  const company = data.find((job) => job.company.id === companyId)?.company;

  // Get all jobs belonging to this company
  const jobs = data.filter((job) => job.company.id === companyId);

  // Company not found
  if (!company) {
    notFound();
  }

  return (
    <section className="min-h-screen w-full px-4 py-6 md:px-8 lg:px-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_7fr]">
        {/* LEFT SIDE: COMPANY DETAILS */}

        <Suspense fallback={<CompanyLoading />}>
          <CompanyDetails company={company} />
        </Suspense>

        {/* RIGHT SIDE: COMPANY JOBS */}
        <main className="min-w-0 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Jobs at {company.name}</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Explore available opportunities at this company.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2">
              <BriefcaseBusiness className="size-4 text-primary" />

              <span className="text-sm font-semibold">{jobs.length} Jobs</span>
            </div>
          </div>

          {/* Job List */}
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="min-w-0">
                  <Suspense>
                    <JobCardComponent jobs={job} />
                  </Suspense>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BriefcaseBusiness className="mb-3 size-10 text-muted-foreground" />

                <h2 className="text-lg font-semibold">No Jobs Available</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  This company currently has no available jobs. Please check
                  back later.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </section>
  );
}

interface CompanyDetailsProps {
  company: {
    about: string;
    id: string;
    location: string;
    logo: string;
    name: string;
    website: string;
    xAccount: string | null;
  };
}

function CompanyDetails({company}:CompanyDetailsProps) {
  return (
    <aside className="min-w-0">
      <Card className="h-fit w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            {/* Company Logo */}
            <div
              className={`flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border ${
                company.logo ? "bg-transparent" : "bg-primary/5"
              }`}
            >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={56}
                  height={56}
                  className="size-full object-contain"
                />
              ) : (
                <Building2 className="size-7 text-primary" />
              )}
            </div>

            {/* Company Name */}
            <div className="min-w-0">
              <CardTitle className="wrap-break-word text-xl font-bold">
                {company.name}
              </CardTitle>

              <CardDescription className="mt-1 flex items-center gap-1">
                <MapPin className="size-4 shrink-0" />
                <span>{company.location}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="border-t pt-4">
            <h2 className="mb-2 font-semibold">About Company</h2>

            <p className="wrap-break-word text-sm leading-6 text-muted-foreground">
              {company.about || "No company description available."}
            </p>
          </div>

          {company.website && (
            <div className="mt-4 border-t pt-4">
              <h3 className="mb-2 font-semibold">Company Website</h3>

              <Link
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-primary hover:underline"
              >
                {company.website}
              </Link>
            </div>
          )}
          {company.xAccount && (
            <div className="mt-4 border-t pt-4">
              <h3 className="mb-2 font-semibold">Company X Account</h3>

              <Link
                href={company.xAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sm text-primary hover:underline"
              >
                {company.xAccount}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}

function CompanyLoading() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-gray-200" />
        <div className="h-40 rounded bg-gray-200" />
        <div className="h-24 rounded bg-gray-200" />
      </div>
    </section>
  );
}
