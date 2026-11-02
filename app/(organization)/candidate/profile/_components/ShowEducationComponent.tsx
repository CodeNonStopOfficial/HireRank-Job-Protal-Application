"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants, Button } from "@/components/ui/button";
import { JsonToHtml } from "@/components/tiptap/JsonTiptapContent";
import {
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  MapPin,
  Award,
  Pencil,
  EllipsisVertical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteButtonComponent } from "@/components/candidate/DeleteButtonComponent";

interface iAppProsEducation {
  education: {
    id: string;
    collegeName: string;
    collegeLogo: string | null;
    courseName: string;
    startDate: string;
    endDate: string | null;
    aboutCollege: string | null;
    updatedAt: Date;
    createdAt: Date;
    jobSeekerId: string | null;
  };
}

function formatLabel(value: string) {
  return value.toLowerCase().replaceAll("_", " ");
}

export default function ShowEducationComponent({
  education,
}: iAppProsEducation) {
  return (
    <Card className="w-full min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <CardContent className="p-3 sm:p-5 md:p-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          {/* Company Logo */}
          <div className="flex shrink-0 items-start">
            {education.collegeLogo ? (
              <div className="relative size-12 overflow-hidden rounded-xl border bg-muted sm:size-14 md:size-16">
                <Image
                  src={education.collegeLogo}
                  alt={`${education.collegeName} logo`}
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                  className="object-contain border rounded-2xl"
                />
              </div>
            ) : (
              <div className="flex size-12 items-center justify-center rounded-xl border bg-primary/10 text-primary sm:size-14 md:size-16">
                <BriefcaseBusiness className="size-6 sm:size-7 md:size-8" />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-1">
            {/* Header + Edit Button */}
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="wrap-break-word text-base font-bold leading-snug sm:text-lg md:text-xl">
                  {education.collegeName}
                </h2>

                <p className="mt-1 wrap-break-word text-sm font-medium text-muted-foreground sm:text-base">
                  {education.courseName}
                </p>
              </div>

              {/* Edit Button */}
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  <EllipsisVertical className="size-4 text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup className="flex flex-col gap-2">
                    <Link
                      href={`profile/education/${education.id}`}
                      className={buttonVariants({
                        variant: "outline",
                        className: "p-2 w-full items-center justify-start",
                      })}
                    >
                      <Pencil className="size-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <div>
                      <DeleteButtonComponent
                        type="education"
                        deleteId={education.id}
                      />
                    </div>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Date Range */}
            <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <CalendarDays className="size-4 shrink-0" />

              <span className="wrap-break-word">
                {education.startDate} – {education.endDate || "Present"}
              </span>
            </div>

            <div>
              {education.aboutCollege && (
                <div className="min-w-0 overflow-hidden leading-6 text-muted-foreground">
                  <DescriptionContent content={education.aboutCollege} />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface IAppProsContent {
  content: string;
}

function DescriptionContent({ content }: IAppProsContent) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Description</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open Description</DialogTitle>
          <DialogDescription>
            This dialog has a sticky content that stays visible while the
            content scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <JsonToHtml json={JSON.parse(content)} />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
