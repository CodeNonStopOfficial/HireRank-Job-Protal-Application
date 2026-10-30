"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  ArrowUpRight,
  Building2,
  Users,
  Globe,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllCompanyAndWithJobsType, getAllCompanyType } from "@/app/services/candidata/get-companyall";
import Image from "next/image";

// type Company = {
//   id: string;
//   name: string;
//   logo?: string;
//   industry: string;
//   location: string;
//   description: string;
//   openJobs: number;
//   employees: string;
//   website?: string;
// };


interface iAppPropsCompany {
   company : getAllCompanyType
}


const industries = [
  "All Industries",
  "Information Technology",
  "Design & Creative",
  "Cloud Computing",
  "Marketing & Advertising",
  "FinTech",
  "Artificial Intelligence",
];

function CompanyCard({ company }:iAppPropsCompany) {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        {/* Company Logo */}
        <div className="flex items-start justify-between gap-3">
          <div className={`flex size-14 shrink-0 items-center justify-center rounded-xl border ${company.logo ? "bg-transparent" : "bg-primary/5"} text-primary`}>
            {
              company.logo ? (
                 <>
                   <Image src={company.logo} width={44} height={44} className="object-cover rounded" alt="No"/>
                 </>
              ) : (
                <>
                <Building2 className="size-7" />
                </>
              )
            }
          </div>

          <Badge variant="secondary" className="rounded-full px-3 py-3  text-xs">
            IT Services
          </Badge>
        </div>

        {/* Company Information */}
        <div className="mt-5">
          <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {company.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span>{company.location}</span>
          </div>

          <p className="mt-4 line-clamp-3 min-h-18 text-sm leading-6 text-muted-foreground">
            {company.about}
          </p>
        </div>

        {/* Company Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <BriefcaseBusiness className="size-4" />
              <span className="text-lg font-bold">{company._count.jobs}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Open positions</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-primary">
              <Users className="size-4" />
              <span className="text-sm font-semibold">{344}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Employees</p>
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-auto flex items-center gap-3 pt-5">
          <Link className={buttonVariants({
            variant : "outline",
            className : "px-4 py-4 hover:text-primary"
          })} href={`/company/${company.id}`}>
            View Company
            <ArrowUpRight className="ml-2 size-4" />
          </Link>

          {company.website && (
            <Link
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name} website`}
              className={buttonVariants({
                variant:"outline",
                className : "flex items-center gap-2"
              })}
            >
              <span>Website</span>
              <Globe className="size-4" />
            </Link>
            
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface iAppProps {
   companies : getAllCompanyAndWithJobsType;
}

export function CompaniesPage({companies}:iAppProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        company.name.toLowerCase().includes(query) ||
        // company.industry.toLowerCase().includes(query) ||
        company.location.toLowerCase().includes(query);

      const matchesIndustry =
        selectedIndustry === "All Industries"
        // company.industry === selectedIndustry;

      return matchesSearch && matchesIndustry;
    });
  }, [search, selectedIndustry]);

  const totalJobs = companies.reduce(
    (total, company) => total + company._count.jobs,
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="rounded-full border-primary/30 px-4 py-1.5 text-primary"
            >
              Discover Your Next Opportunity
            </Badge>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Explore Top <span className="text-primary">Companies</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Discover companies, explore their work culture, and find
              opportunities that match your skills and career goals.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-2xl border bg-background p-2 shadow-sm transition-shadow focus-within:shadow-md">
              <Search className="ml-3 size-5 shrink-0 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search companies, industries, or locations..."
                aria-label="Search companies"
                className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
              />

              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                  className="shrink-0"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              <div>
                <p className="text-2xl font-bold sm:text-3xl">
                  {companies.length}+
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Companies</p>
              </div>

              <div className="h-10 w-px bg-border" />

              <div>
                <p className="text-2xl font-bold sm:text-3xl">{totalJobs}+</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open Positions
                </p>
              </div>

              <div className="h-10 w-px bg-border" />

              <div>
                <p className="text-2xl font-bold sm:text-3xl">
                  {industries.length - 1}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Heading & Results */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Find Your Next Workplace
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Explore companies that are looking for talented people.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredCompanies.length}
            </span>{" "}
            of {companies.length} companies
          </p>
        </div>

        {/* Industry Filters */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-3">
          {industries.map((industry) => {
            const isSelected = selectedIndustry === industry;

            return (
              <Button
                key={industry}
                variant={isSelected ? "default" : "outline"}
                onClick={() => setSelectedIndustry(industry)}
                className="shrink-0 rounded-full"
              >
                {industry}
              </Button>
            );
          })}
        </div>

        {/* Company Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
              <Search className="size-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">No companies found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try another company name, location, or industry.
            </p>

            <Button
              variant="outline"
              className="mt-5 rounded-xl"
              onClick={() => {
                setSearch("");
                setSelectedIndustry("All Industries");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-14">
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ready to find your dream job?
              </h2>

              <p className="mt-3 text-sm leading-7 opacity-90 sm:text-base">
                Explore exciting opportunities and take the next step in your
                professional journey with JobNest.
              </p>
            </div>

            <Link href="/get-started" className={buttonVariants({
              variant : "outline",
              className : "px-4 py-4.5 bg-blue-900"
            })}>
               Explore Jobs
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
