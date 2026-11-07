"use client";

import {
  userProfileSchema,
  userProfileSchemaType,
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
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillsInput } from "@/components/post-jobs/SkiilsInputBox";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Loader2,
  Plus,
  RotateCcw,
  Upload,
} from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { UpdateProfileJobSeeker } from "../actions";
import { tryCatch } from "@/hooks/try-catchs";
import { useRouter } from "next/navigation";
import { getJobSeerProfileDataByIdType } from "@/app/services/users/get-jobseekerdata-byid";

interface iAppProsProfile {
  profile: getJobSeerProfileDataByIdType;
}

export function EducationCreationForm({ profile }: iAppProsProfile) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<userProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: profile.name ?? "",
      phone: profile.phone ?? "",
      about: profile.about ?? "",
      resume: null,
      linkedingUrl: profile.linkeding ?? "",
      githubUrl: profile.githubUrl ?? "",
      goal: profile.goal ?? "",
      headline: profile.headline ?? "",
      xAccountUrl: profile.xAccount ?? "",
      skills: profile.skills ?? [],
      location: profile.location ?? "",
    },
  });

  function onSubmit(value: userProfileSchemaType) {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        UpdateProfileJobSeeker(value, profile!.id),
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
          title: "Interval Server Error",
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
                  Update Profile Professional Information
                </CardTitle>

                <CardDescription>
                  Enter your profile and Information details.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <FieldGroup>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Company Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Enter a Name"
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
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Location</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. Location"
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
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />
                        Phone Number
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. Phone Number"
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
                  name="headline"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />
                        HeadLine
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. I am a Developer"
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
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl border shadow-sm">
          <CardHeader className="border-b bg-muted/30 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>

              <div>
                <CardTitle className="text-lg">
                  Update Profile Social Link
                </CardTitle>

                <CardDescription>
                  Add Social Profile Link to View all Candidate
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <FieldGroup>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Company Name */}
                <Controller
                  name="linkedingUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Linkedin</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="etc.http://www.linkedin.com"
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
                  name="githubUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Github</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. https://www.github.com"
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
                  name="xAccountUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />X Account
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. https://www.x.accont.com"
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
                  name="websiteUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        <CalendarDays className="size-4" />
                        Website
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. https://www.domain.com"
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
              </div>
            </FieldGroup>
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
                <CardTitle className="text-lg">Description</CardTitle>

                <CardDescription>
                  Describe your responsibilities, skills, and achievements.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <Controller
              name="skills"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Required Skills</FieldLabel>

                  <SkillsInput
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="e.g. React, Node.js, SQL"
                    maxSkills={30}
                  />
                  <FieldDescription>
                    Separate skills with commas.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="about"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    About Description
                  </FieldLabel>

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
                <CardTitle className="text-lg">Resume Upload</CardTitle>

                <CardDescription>
                  Upload your company logo to make your profile look
                  professional.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <Controller
              name="resume"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Upload Resume</FieldLabel>

                  <div className="rounded-xl border border-dashed bg-muted/20 p-3 sm:p-5">
                    <MediaUploader
                      accept="application/pdf"
                      maxSize="Maximum 8MB"
                      value={field.value}
                      onChange={field.onChange}
                      endpoint="pdfUploader"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, Docs, ... other, Maximum size: 8MB.
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
                Update
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
