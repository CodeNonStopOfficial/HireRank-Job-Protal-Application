"use client";
import Link from "next/link";
import {
  BriefcaseBusiness,
  MapPin,
  Mail,
  ArrowRight,
  Link2Icon,
  InspectionPanel,
  FaceAngryIcon,
  TextWrap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const footerLinks = {
  "For Job Seekers": [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Browse Companies", href: "/companies" },
    { name: "Internships", href: "/jobs?type=INTERNSHIP" },
    { name: "Career Advice", href: "/career-advice" },
  ],
  "For Employers": [
    { name: "Post a Job", href: "/employer/jobs/new" },
    { name: "Browse Candidates", href: "/employer/candidates" },
    { name: "Pricing Plans", href: "/pricing" },
    { name: "Employer Resources", href: "/employer/resources" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:py-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BriefcaseBusiness className="size-5" />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Hire<span className="text-primary">Rank</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              Discover opportunities, connect with great companies, and take the
              next step in your career. Your dream job starts with JobNest.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@jobnest.com"
                  className="transition-colors hover:text-primary"
                >
                  support@jobnest.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Connecting talent worldwide</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Link2Icon, label: "LinkedIn", href: "#" },
                { icon: InspectionPanel, label: "Instagram", href: "#" },
                { icon: FaceAngryIcon, label: "Facebook", href: "#" },
                { icon: TextWrap, label: "Twitter", href: "#" },
              ].map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-sm font-bold">{title}</h3>

              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Newsletter Section */}
        <div className="flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h3 className="text-lg font-bold">
              Get the latest job opportunities
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Stay updated with new jobs, internships, and career tips.
            </p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full gap-2 md:max-w-md"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              className="h-11 rounded-xl"
            />

            <Button type="submit" className="h-11 shrink-0 rounded-xl px-4">
              Subscribe
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
        </div>

        <Separator />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {currentYear} JobNest. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground sm:text-sm">
            Built to help you find your next opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
