"use client";

import Link from "next/link";
import {
  CodeXml,
  Palette,
  BarChart3,
  BriefcaseBusiness,
  Megaphone,
  Database,
  Headphones,
  GraduationCap,
  Cpu,
  HeartPulse,
  Calculator,
  Building2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import type { getAllCategoryType } from "@/app/services/candidata/get-allcategoryes";

interface iAppProps {
  catogory: getAllCategoryType;
}

const categoryLabels: Record<
  string,
  { icon: LucideIcon; color: string; bg: string }
> = {
  development: {
    icon: CodeXml,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-950",
  },
  "web development": {
    icon: CodeXml,
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-950",
  },
  design: {
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-950",
  },
  "ui/ux design": {
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-950",
  },
  marketing: {
    icon: Megaphone,
    color: "text-orange-600",
    bg: "bg-orange-100 dark:bg-orange-950",
  },
  "data science": {
    icon: BarChart3,
    color: "text-green-600",
    bg: "bg-green-100 dark:bg-green-950",
  },
  database: {
    icon: Database,
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-950",
  },
  business: {
    icon: BriefcaseBusiness,
    color: "text-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-950",
  },
  education: {
    icon: GraduationCap,
    color: "text-pink-600",
    bg: "bg-pink-100 dark:bg-pink-950",
  },
  engineering: {
    icon: Cpu,
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-950",
  },
  healthcare: {
    icon: HeartPulse,
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-950",
  },
  finance: {
    icon: Calculator,
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-950",
  },
  hr: {
    icon: Building2,
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-950",
  },
  "customer support": {
    icon: Headphones,
    color: "text-teal-600",
    bg: "bg-teal-100 dark:bg-teal-950",
  },
};

const defaultCategory = {
  icon: BriefcaseBusiness,
  color: "text-primary",
  bg: "bg-primary/10",
};

export function CategorySection({ catogory }: iAppProps) {
  return (
    <section className="w-full px-4 py-10 md:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Popular Job Categories
          </h2>

          <p className="mt-3 max-w-xl text-muted-foreground">
            Explore jobs by category, discover new opportunities, and find the
            right career for your skills.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {catogory.map((category, index) => {
            /*
              IMPORTANT:
              Replace `category.name` and `category.jobCount` below
              with the actual fields returned by your service.
            */
            const categoryName = category.name;
            const categoryKey = categoryName?.trim().toLowerCase();

            const style = categoryKey
              ? categoryLabels[categoryKey] ?? defaultCategory
              : defaultCategory;

            const Icon = style.icon;

            return (
              <Link
                key={`${categoryName ?? "category"}-${index}`}
                href={`/get-started?category=${encodeURIComponent(categoryName ?? "")}`}
                className="group rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <h3 className="text-lg font-semibold group-hover:text-primary">
                  {categoryName}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {category.jobCount ?? 0}
                  </span>{" "}
                  {(category.jobCount ?? 0) === 1 ? "job" : "jobs"} available
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
