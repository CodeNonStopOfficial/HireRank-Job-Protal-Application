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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateExprienceFormMethod } from "../actions";
import { tryCatch } from "@/hooks/try-catchs";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

export function CreateExprienceForm() {
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

  function onSubmit(value: createExprienceSchemaType) {
    startTransition(async () => {
      const { data, error } = await tryCatch(CreateExprienceFormMethod(value));
      if (error) {
        toast.add({
          type: "error",
          title: "Invalide Server Error",
        });
        return;
      }
      if (data?.status === "success") {
        toast.add({
          type: "success",
          title: data.message,
        });
        router.push("/candidate/profile");
      } else if (data.status === "error") {
        toast.add({
          type: "error",
          title: data.message,
        });
      } else {
        toast.add({
          type: "error",
          title: "Failed to Create Exprience",
        });
      }
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Exprience Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller
                  name="companyName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Company Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter a Company Name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="position"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Position</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter a Work Position"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="startDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="March - 2025 or Present"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="endDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>End Date</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="ex.Aug-3034"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="employmentType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Employment</FieldLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentOptions.map((data, index) => (
                            <SelectItem key={index + 1} value={data.value}>
                              {data.label}
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
                <Controller
                  name="workType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Work Type</FieldLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ONSITE">ONSITE</SelectItem>
                          <SelectItem value="REMOTE">REMOTE</SelectItem>
                          <SelectItem value="HYBRID">HYBRID</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="certificationUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Certification Link
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://www.certification.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="projectLink"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Project Link</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://www.projectlink.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="space-y-3">
                <Controller
                  name="workDescription"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <TiptapRichTextEditor field={field as any} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="companyLogo"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Company Logo</FieldLabel>
                      <MediaUploader
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        maxSize="Maximum 4MB"
                        value={field.value}
                        onChange={field.onChange}
                        endpoint="imageUploader"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
            <div className="my-4 flex items-center justify-end gap-3">
              <Button
                type="reset"
                onClick={() => form.reset()}
                variant="outline"
                className="px-6 py-4.5"
              >
                Reset
              </Button>

              <Button type="submit" className="px-4 py-4.5">
                {isPending ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <Plus className="size-4" />
                      <span>Create Exprience</span>
                    </div>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
