"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Users,
} from "lucide-react";
import Image from "next/image";

const stats = [
  {
    label: "Active Jobs",
    value: 50,
    icon: BriefcaseBusiness,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  },
  {
    label: "Companies",
    value: 100,
    icon: Building2,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
  },
  {
    label: "Job Seekers",
    value: 500,
    icon: Users,
    color:
      "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300",
  },
];

export function HeroSection() {
  function formatStat(value: number) {
    if (value >= 1000) {
      return `${Number((value / 1000).toFixed(1))}K+`;
    }

    return `${value}+`;
  }
  return (
    <div className="max-w-full px-4 md:px-8 lg:px-12 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
        <div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/70 px-4 py-2 text-sm font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span>🚀</span>
              Your next career move starts here
            </div>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find Your Dream Job with{" "}
              <span className="text-primary">HireRank</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              Explore thousands of job opportunities from top companies and take
              the next step in your career journey.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="flex min-w-0 flex-col gap-3 px-3 first:pl-0 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${color}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                    {formatStat(value)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* //image  */}
        <div>
          <div aria-hidden="true" className="absolute inset-10 rounded-full" />
          <div className="relative mx-auto w-full max-w-140 lg:max-w-none">
            {/* Illustration image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-4xl">
              <Image
                src="https://static.naukimg.com/s/7/0/assets/images/src/widgets/nc-desktop-speech-assessment-banner-wdgt/latest/components/assets/collegeStudent.eae3858e.png"
                alt="Professional exploring career opportunities on a laptop"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain"
              />
            </div>

            {/* Floating career card */}
            <div className="absolute left-0 top-[16%] hidden max-w-51.25 -rotate-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800/95 sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Career Growth
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Your future starts here
                  </p>
                </div>
              </div>
            </div>

            {/* Floating job card */}
            <div className="absolute bottom-[18%] right-0 hidden rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800/95 sm:block">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Opportunities waiting
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Find your role
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Make your next move
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
