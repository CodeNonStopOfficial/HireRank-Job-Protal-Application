"use client";

import { employmentOptions } from "@/app/utils/typejsondata";
import {
  createExprienceSchema,
  createExprienceSchemaType,
} from "@/app/utils/zodSchema";
import { MediaUploader } from "@/components/common/media-uploader";
import { TiptapRichTextEditor } from "@/components/tiptap/TipTapRichTextEditor";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Loader2,
  Link2,
  MapPin,
  Plus,
  RotateCcw,
  Upload,
} from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CreateExprienceFormMethod,
  UpdateExprienceFormMethod,
} from "../actions";
import { tryCatch } from "@/hooks/try-catchs";
import { useRouter } from "next/navigation";
import { GetExperienceDataByIdType } from "@/app/services/users/get-exprience-databyid";

interface iAppProsExprience {
  mode: "create" | "update";
  exprience?: GetExperienceDataByIdType;
}

export function CreateExprienceForm({ mode, exprience }: iAppProsExprience) {
  const stepmode = mode === "create";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<createExprienceSchemaType>({
    resolver: zodResolver(createExprienceSchema),
    defaultValues: {
      companyName: "",
      companyLogo: null,
      position: "",
      startDate: "",
      endDate: "",
      workDescription: "",
      projectLink: "",
      certificationUrl: "",
      workType: "ONSITE",
      employmentType: "FULL_TIME",
    },
  });

  useEffect(() => {
    if (exprience) {
      form.reset({
        companyName: exprience.companyName ?? "",
        companyLogo: null,
        position: exprience.position ?? "",
        startDate: exprience.startDate ?? "",
        endDate: exprience.endDate ?? "",
        workDescription: exprience.workDescription ?? "",
        projectLink: exprience.projectLink ?? "",
        certificationUrl: exprience.certificationUrl ?? "",
        workType: exprience.workType ?? "ONSITE",
        employmentType: exprience.employmentType ?? "FULL_TIME",
      });
    }
  }, [exprience, form]);

  function onSubmit(value: createExprienceSchemaType) {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        stepmode
          ? CreateExprienceFormMethod(value)
          : UpdateExprienceFormMethod(value, exprience!.id),
      );
      if (error) {
        toast.add({
          type: "error",
          title: "Server Error",
        });
        return;
      }

      if (data?.status === "success") {
        toast.add({
          type: "success",
          title: data.message,
        });
        form.reset();
        router.push("/candidate/profile");
      } else if (data?.status === "error") {
        toast.add({
          type: "error",
          title: data.message,
        });
      } else {
        toast.add({
          type: "error",
          title: "Failed to create experience",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>

              <div>
                <CardTitle className="text-lg">
                  {stepmode
                    ? "Create Exprience Professional Information"
                    : "Update Exprience Professional Information"}
                </CardTitle>

                <CardDescription>
                  Enter your company and job details.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <FieldGroup>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Company Name */}
                <Controller
                  name="companyName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. Google, Microsoft"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Position */}
                <Controller
                  name="position"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Job Position</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. Software Developer"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Start Date */}
                <Controller
                  name="startDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />
                        Start Date
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. March 2025"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* End Date */}
                <Controller
                  name="endDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />
                        End Date
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. August 2026"
                        aria-invalid={fieldState.invalid}
                        className="h-11"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}

                      <p className="text-xs text-muted-foreground">
                        Leave empty if you are currently working here.
                      </p>
                    </Field>
                  )}
                />

                {/* Employment Type */}
                <Controller
                  name="employmentType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        <BriefcaseBusiness className="size-4" />
                        Employment Type
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="h-11 w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>

                        <SelectContent>
                          {employmentOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Work Type */}
                <Controller
                  name="workType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        <MapPin className="size-4" />
                        Work Location Type
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="h-11 w-full"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="ONSITE">On-site</SelectItem>

                          <SelectItem value="REMOTE">Remote</SelectItem>

                          <SelectItem value="HYBRID">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Links Section */}
        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Link2 className="size-5" />
              </div>

              <div>
                <CardTitle className="text-lg">Professional Links</CardTitle>

                <CardDescription>
                  Add your project and certification URLs.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Project Link */}
              <Controller
                name="projectLink"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <Link2 className="size-4" />
                      Project Link
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="url"
                      placeholder="https://your-project.com"
                      aria-invalid={fieldState.invalid}
                      className="h-11"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Certification Link */}
              <Controller
                name="certificationUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      <Award className="size-4" />
                      Certification Link
                    </FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="url"
                      placeholder="https://certificate.com"
                      aria-invalid={fieldState.invalid}
                      className="h-11"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BriefcaseBusiness className="size-5" />
              </div>

              <div>
                <CardTitle className="text-lg">Work Description</CardTitle>

                <CardDescription>
                  Describe your responsibilities, skills, and achievements.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <Controller
              name="workDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                  <div className="min-w-0 overflow-hidden rounded-xl border">
                    <TiptapRichTextEditor field={field as any} />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <p className="text-xs text-muted-foreground">
                    Provide a clear summary of your work experience.
                  </p>
                </Field>
              )}
            />
          </CardContent>
        </Card>

        {/* Company Logo */}
        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Upload className="size-5" />
              </div>

              <div>
                <CardTitle className="text-lg">Company Logo</CardTitle>

                <CardDescription>
                  Upload your company logo to make your profile look
                  professional.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <Controller
              name="companyLogo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Upload Logo</FieldLabel>

                  <div className="rounded-xl border border-dashed bg-muted/20 p-3 sm:p-5">
                    <MediaUploader
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      maxSize="Maximum 4MB"
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="imageUploader"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <p className="text-xs text-muted-foreground">
                    Supported formats: PNG, JPG, WEBP, SVG. Maximum size: 4MB.
                  </p>
                </Field>
              )}
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="sticky bottom-0 z-10 -mx-2 flex flex-col-reverse gap-3 border-t bg-background/95 p-3 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:justify-end sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <Button
            type="reset"
            variant="outline"
            disabled={isPending}
            onClick={() => form.reset()}
            className="h-11 w-full gap-2 sm:w-auto"
          >
            <RotateCcw className="size-4" />
            Reset Form
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full gap-2 sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                <Plus className="size-4" />
                {stepmode ? "Create Experience" : "Update Experience"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
