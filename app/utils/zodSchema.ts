import { z } from "zod";

const uploadedFileSchema = z.object({
  url: z.string().url(),
  key: z.string(),
  name: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
});

export const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  about: z
    .string()
    .min(10, "Please provide more information about your company"),
  logo: uploadedFileSchema.nullable(),
  website: z.string().url("Please enter a valid website URL"),
  xAccount: z.string().optional(),
  linkedin: z.url().optional(),
  employes: z.string().optional(),
  organization: z.string().optional(),
});

export const jobSeekerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  about: z.string().min(10, "Please provide more information about yourself"),
  resume: uploadedFileSchema.nullable(),
});

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Job title must be at least 3 characters")
    .max(150, "Job title cannot exceed 150 characters"),
  department: z
    .string()
    .trim()
    .max(100, "Department cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(150, "Location cannot exceed 150 characters"),

  workplaceType: z.enum(["ONSITE", "REMOTE", "HYBRID"]),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "TEMPORARY",
    "FREELANCE",
  ]),

  experienceLevel: z.enum([
    "ENTRY_LEVEL",
    "JUNIOR",
    "MID_LEVEL",
    "SENIOR",
    "LEAD",
    "EXECUTIVE",
  ]),
  salaryMin: z.number().min(1, "Salary from is required"),
  salaryMax: z.number().min(1, "Salary to is required"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "DRAFT",
    "PUBLISHED",
    "CLOSED",
    "ARCHIVED",
  ]),
  salaryCurrency: z.string().length(3, "Currency must be a 3-letter code"),
  openings: z.number().int().min(1, "At least one opening is required"),
  description: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters")
    .max(10000, "Description cannot exceed 10000 characters"),
  salaryPeriod: z.string().min(1, "Salarey Period Requried"),
  skills: z
    .array(z.string().trim().min(1).max(50))
    .max(30, "You can add up to 30 skills"),
  requirements: z
    .string()
    .trim()
    .min(10, "Requirements must be at least 10 characters")
    .max(2000, "Requirements cannot exceed 2000 characters"),
});

export type CreateJobInputType = z.infer<typeof createJobSchema>;

export const createExprienceSchema = z.object({
  companyName: z
    .string()
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be less than 50 characters"),

  companyLogo: uploadedFileSchema.nullable().optional(),

  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .max(50, "Position must be less than 50 characters"),

  startDate: z
    .string()
    .min(1, "Please add your work start date")
    .max(20, "Start date is too long"),

  endDate: z
    .string()
    .max(20, "End date is too long")
    .optional()
    .or(z.literal("")),

  workDescription: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(10000, "Description must be less than 10k characters")
    .optional()
    .or(z.literal("")),

  projectLink: z.union([z.url(), z.literal("")]).optional(),

  certificationUrl: z.union([z.url(), z.literal("")]).optional(),

  workType: z.enum(["ONSITE", "REMOTE", "HYBRID"]),

  employmentType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "TEMPORARY",
    "FREELANCE",
  ]),
});

export type createExprienceSchemaType = z.infer<typeof createExprienceSchema>;

export const educationSchema = z.object({
  collegeName: z
    .string()
    .min(3, "College name must be at least 3 characters")
    .max(50, "College name must be less than 50 characters"),
  collegeLogo: uploadedFileSchema.nullable().optional(),
  courseName: z.string().max(10, "Course Less then 20 characters"),
  startDate: z
    .string()
    .min(1, "Please add your work start date")
    .max(20, "Start date is too long"),

  endDate: z
    .string()
    .max(20, "End date is too long")
    .optional()
    .or(z.literal("")),
  aboutCollege: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(3000, "Description must be less than 3000 characters")
    .optional()
    .or(z.literal("")),
});

export type EducationSchemaType = z.infer<typeof educationSchema>;