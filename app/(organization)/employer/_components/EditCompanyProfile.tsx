"use client";

import { companySchema } from "@/app/utils/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { MediaUploader } from "@/components/common/media-uploader";
import { useTransition } from "react";
import { toast } from "@/components/ui/toast";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  BriefcaseBusiness,
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Sparkles,
  ImagePlus,
} from "lucide-react";
import { LinkedIn, XformerlyTwitter } from "@/app/utils/iconsvgl";
import { GetCompanyProfileType } from "@/app/services/employer/get-company";
import { tryCatch } from "@/hooks/try-catchs";
import { EditCompanyProfile } from "../profile/[companyId]/actions";

interface iAppPropsProfile {
  data: GetCompanyProfileType;
}

export function EditCompanyProfileForm({ data }: iAppPropsProfile) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const companyId = data.id;

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: data.name ?? "",
      location: data.location ?? "",
      about: data.about ?? "",
      logo: null,
      website: data.website ?? "",
      xAccount: data.xAccount ?? "",
      employes: data.employes ?? "",
      linkedin: data.linkedin ?? "",
      organization : data.organization ?? ""
    },
  });

  async function onSubmit(value: z.infer<typeof companySchema>) {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        EditCompanyProfile(value, companyId),
      );
      if (error) {
        toast.add({
          type: "error",
          title: "Edit Company Error",
        });
        return;
      }
      if (data.status) {
        toast.add({
          type: "success",
          title: data?.message,
        });
        router.push("/employer/profile");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-background p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/5 blur-2xl" />

        <div className="relative flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Building2 className="size-6" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Set up your company
              </h1>

              <span className="inline-flex items-center gap-1 rounded-full border bg-background/80 px-2.5 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" />
                Company Setup
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Introduce your company to potential candidates. Add your company
              details, online presence, and branding to build a professional
              employer profile.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="gap-6">
          {/* Company Information */}
          <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b bg-muted/20 px-5 py-5 sm:px-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="font-semibold tracking-tight">
                  Company Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell candidates who you are and where you operate.
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
              {/* Company Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      Company Name <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Acme Technologies"
                        autoComplete="organization"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="organization"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      Organization and Indrustry <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Acme Technologies"
                        autoComplete="organization"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Location */}
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      Company Location{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. New Delhi, India"
                        autoComplete="address-level2"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Company Size */}
              <Controller
                name="employes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>Company Size</FieldLabel>

                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. 11-50 employees"
                        autoComplete="off"
                        className="h-11 pl-9"
                      />
                    </div>

                    <FieldDescription>
                      Approximate number of employees.
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Website */}
              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      Company Website
                    </FieldLabel>

                    <div className="relative">
                      <Globe className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="https://example.com"
                        autoComplete="url"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* About */}
              <div className="sm:col-span-2">
                <Controller
                  name="about"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel htmlFor={field.name}>
                        About Your Company{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>

                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Describe what your company does, your mission, your culture, and what makes your organization a great place to work..."
                        className="min-h-36 resize-y leading-6"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <FieldDescription>
                          A clear description helps candidates understand your
                          organization.
                        </FieldDescription>

                        <span className="text-xs text-muted-foreground">
                          {field.value?.length ?? 0} characters
                        </span>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Online Presence */}
          <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b bg-muted/20 px-5 py-5 sm:px-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="font-semibold tracking-tight">
                  Online Presence
                </h2>
                <p className="text-sm text-muted-foreground">
                  Help candidates discover and connect with your company.
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
              {/* LinkedIn */}
              <Controller
                name="linkedin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      LinkedIn Profile
                    </FieldLabel>

                    <div className="relative">
                      <LinkedIn className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="https://linkedin.com/company/..."
                        autoComplete="url"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* X Account */}
              <Controller
                name="xAccount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel htmlFor={field.name}>
                      X (Twitter) Profile
                    </FieldLabel>

                    <div className="relative">
                      <XformerlyTwitter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="https://x.com/yourcompany"
                        autoComplete="url"
                        className="h-11 pl-9"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </section>

          {/* Company Branding */}
          <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-start gap-3 border-b bg-muted/20 px-5 py-5 sm:px-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ImagePlus className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="font-semibold tracking-tight">
                  Company Branding
                </h2>
                <p className="text-sm text-muted-foreground">
                  Upload your company logo to make your profile recognizable.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <Controller
                name="logo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-3">
                    <FieldLabel htmlFor={field.name}>
                      Company Logo <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div className="rounded-xl border border-dashed bg-muted/20 p-4 sm:p-6">
                      <MediaUploader
                        endpoint="imageUploader"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        maxSize="Maximum 4MB"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>

                    <FieldDescription>
                      Use a clear, high-quality PNG, JPG, WebP, or SVG logo.
                      Maximum file size: 4MB.
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </section>
        </FieldGroup>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BriefcaseBusiness className="size-4 shrink-0" />
            <span>You can update your company profile later.</span>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2"
              disabled={pending}
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
              Skip for now
            </Button>

            <Button
              disabled={pending}
              type="submit"
              className="h-11 gap-2 px-6"
            >
              {pending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Creating company...
                </>
              ) : (
                <>
                  Update Company
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
