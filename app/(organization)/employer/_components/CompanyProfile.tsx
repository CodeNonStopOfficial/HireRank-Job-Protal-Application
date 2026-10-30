import { EmployeCompanyByIdProfileType } from "@/app/services/employer/get-company";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Globe,
  //   Linkedin
  BriefcaseBusiness,
  Users,
  Building2,
  Link2Icon,
  Edit2,
} from "lucide-react";
import Image from "next/image";
import { LinkedIn, XformerlyTwitter } from "@/app/utils/iconsvgl";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface IAppCompanyProfil {
  company: EmployeCompanyByIdProfileType;
}

export function CompanyProfileComponent({ company }: IAppCompanyProfil) {
  return (
    <Card className="overflow-hidden mt-6">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Company Profile</CardTitle>

          <Badge variant="secondary">Company</Badge>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-3">
          <div className="flex gap-4 flex-row items-center">
            <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted">
              {company.logo ? (
                <Image
                  src={company.logo}
                  width={96}
                  height={96}
                  alt={`${company.name} logo`}
                  className="size-full object-cover"
                />
              ) : (
                <Building2 className="size-10 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {company.name}
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{company.location || "Location not provided"}</span>
              </div>

              {company.website && (
                <a
                  href={
                    company.website.startsWith("http")
                      ? company.website
                      : `https://${company.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Globe className="size-4" />
                  Company Website
                </a>
              )}
            </div>
          </div>
          <div>
             <Link href={`profile/${company.id}`} className={
                buttonVariants({
                    variant : "outline",
                    className : "px-4 py-4.5"
                })
             }>
                  <Edit2 className="size-4 text-primary"/>
                  <span>Edit Company</span>
             </Link>
          </div>
        </div>

        <CardDescription>
          View your company information, online presence, and hiring activity.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <BriefcaseBusiness className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-2xl font-bold">{company._count.jobs}</p>
              <p className="text-sm text-muted-foreground">Posted Jobs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border p-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Users className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-2xl font-bold">
                {company.employes || "Not specified"}
              </p>
              <p className="text-sm text-muted-foreground">Company Size</p>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <section className="space-y-2">
          <h3 className="font-semibold">About Company</h3>

          <p className="whitespace-pre-line text-[18px] leading-6 text-muted-foreground">
            {company.about || "No company description provided yet."}
          </p>
        </section>

        {/* Social Links */}
        {(company.linkedin || company.xAccount) && (
          <section className="space-y-3">
            <h3 className="font-semibold">Social Media</h3>

            <div className="flex flex-wrap gap-3">
              <div>
                {company.linkedin && (
                  <Link
                    href={
                      company.linkedin.startsWith("http")
                        ? company.linkedin
                        : `https://${company.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <LinkedIn className="size-4 text-primary" />
                    LinkedIn
                  </Link>
                )}
              </div>

              <div>
                {company.xAccount && (
                  <Link
                    href={
                      company.xAccount.startsWith("http")
                        ? company.xAccount
                        : `https://${company.xAccount}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span className="font-bold flex items-center gap-1">
                      <XformerlyTwitter className="size-4 text-primary" />
                      Twitter
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
