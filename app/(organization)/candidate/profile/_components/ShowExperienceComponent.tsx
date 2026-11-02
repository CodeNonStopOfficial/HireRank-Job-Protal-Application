"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
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

interface iAppProsExprience {
  data: {
    id: string;
    companyName: string;
    companyLogo: string | null;
    position: string;
    startDate: string;
    endDate: string | null;
    workDescription: string | null;
    projectLink: string | null;
    certificationUrl: string | null;
    workType: string;
    employmentType: string;
    createdAt: Date;
    updatedAt: Date;
    jobSeekerId: string;
  };
}

function formatLabel(value: string) {
  return value.toLowerCase().replaceAll("_", " ");
}

export default function ShowExprienceComponent({ data }: iAppProsExprience) {
  return (
    <Card className="w-full min-w-0 overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <CardContent className="p-3 sm:p-5 md:p-6">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          {/* Company Logo */}
          <div className="flex shrink-0 items-start">
            {data.companyLogo ? (
              <div className="relative size-12 overflow-hidden rounded-xl border bg-muted sm:size-14 md:size-16">
                <Image
                  src={data.companyLogo}
                  alt={`${data.companyName} logo`}
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
                  {data.position}
                </h2>

                <p className="mt-1 wrap-break-word text-sm font-medium text-muted-foreground sm:text-base">
                  {data.companyName}
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
                      href={`profile/experience/${data.id}`}
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
                        type="exprience"
                        deleteId={data.id}
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
                {data.startDate} – {data.endDate || "Present"}
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-2">
              <Badge variant="default" className="text-xs capitalize">
                <MapPin className="mr-1 size-3 shrink-0" />
                {formatLabel(data.workType)}
              </Badge>

              <Badge variant="outline" className="text-xs capitalize">
                {formatLabel(data.employmentType)}
              </Badge>

              {!data.endDate && (
                <Badge className="bg-emerald-500/10 text-xs text-emerald-600 hover:bg-emerald-500/20">
                  Currently Working
                </Badge>
              )}
            </div>
            {/* Project and Certification Links */}
            {(data.projectLink || data.certificationUrl) && (
              <div className="flex flex-wrap gap-x-4 items-start gap-3 justify-start border-t pt-3">
                {data.projectLink && (
                  <Link
                    href={data.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-0 items-center gap-1.5 wrap-break-word text-xs font-medium text-primary hover:underline sm:text-sm"
                  >
                    <ExternalLink className="size-4 shrink-0" />
                    View Project
                  </Link>
                )}

                {data.certificationUrl && (
                  <Link
                    href={data.certificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-0 items-center gap-1.5 wrap-break-word text-xs font-medium text-primary hover:underline sm:text-sm"
                  >
                    <Award className="size-4 shrink-0" />
                    View Certificate
                  </Link>
                )}
                <div>
                  {data.workDescription && (
                    <div className="min-w-0 overflow-hidden text-sm leading-6 text-muted-foreground">
                      <DescriptionContent content={data.workDescription} />
                    </div>
                  )}
                </div>
              </div>
            )}
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
