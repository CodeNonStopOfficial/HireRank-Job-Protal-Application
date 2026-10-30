
"use client";

import type { getAllCompanyAndWithJobsType } from "@/app/services/candidata/get-companyall";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface iAppCompany {
  company: getAllCompanyAndWithJobsType;
}

export function CompanySection({ company }: iAppCompany) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (!company?.length) return null;

  return (
    <section className="w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-primary sm:text-sm">
            TOP COMPANIES
          </span>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Get Hired by{" "}
            <span className="text-primary">Leading Companies</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
            Explore exciting job opportunities from leading organizations
            and find the right place to grow your career.
          </p>
        </div>

        {/* Horizontal company slider */}
        <div className="relative">
          {/* Left navigation */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(-1)}
            aria-label="Scroll companies left"
            className="absolute -left-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 rounded-full border-border bg-background shadow-lg transition hover:bg-primary hover:text-primary-foreground md:flex lg:-left-5"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div
            ref={sliderRef}
            role="region"
            aria-label="Companies hiring"
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-0.5 pb-5 scrollbar-none [&::-webkit-scrollbar]:hidden sm:gap-4 lg:gap-5"
          >
            {company.map((data) => (
              <Link
                key={data.id}
                href={`/get-started?company=${encodeURIComponent(data.name)}`}
                className="group flex min-w-[78%] snap-start flex-col items-center justify-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-w-[44%] sm:p-6 md:min-w-[30%] lg:min-w-[23%] lg:p-7"
              >
                {/* Company icon */}
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Image src={data.logo} width={34} height={44} alt="logo"/>
                </div>

                {/* Company name */}
                <h3 className="mt-4 line-clamp-1 w-full text-base font-bold tracking-tight sm:text-lg">
                  {data.name}
                </h3>

                {/* Job count */}
                <p className="mt-2 text-sm text-muted-foreground">
                  {data._count.jobs}{" "}
                  {data._count.jobs === 1 ? "open position" : "open positions"}
                </p>

                {/* Link label */}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                  Explore jobs
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Right navigation */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(1)}
            aria-label="Scroll companies right"
            className="absolute -right-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 rounded-full border-border bg-background shadow-lg transition hover:bg-primary hover:text-primary-foreground md:flex lg:-right-5"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        {/* Footer hint */}
        <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
          Swipe to explore companies and discover your next opportunity.
        </p>
      </div>
    </section>
  );
}
