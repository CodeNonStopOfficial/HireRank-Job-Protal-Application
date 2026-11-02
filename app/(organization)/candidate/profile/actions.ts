
"use server";

import { requiredUser } from "@/app/utils/requiredUser";
import {
  createExprienceSchema,
  createExprienceSchemaType,
} from "@/app/utils/zodSchema";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";

export async function CreateExprienceFormMethod(
  data: createExprienceSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await requiredUser();

    if (!session?.id) {
      return {
        status: "error",
        message: "User not found",
      };
    }

    const validatedData = createExprienceSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        status: "error",
        message: validatedData.error.issues
          .map((issue) => issue.message)
          .join(", "),
      };
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: {
        userId: session.id,
      },
      select: {
        id: true,
      },
    });

    if (!jobSeeker) {
      return {
        status: "error",
        message: "Job seeker profile not found",
      };
    }

    const {
      companyLogo,
      ...experienceData
    } = validatedData.data;

    await prisma.experience.create({
      data: {
        ...experienceData,
        companyLogo: companyLogo?.url ?? "",
        jobSeeker: {
          connect: {
            id: jobSeeker.id,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Experience created successfully",
    };
  } catch (error) {
    console.error("Create experience error:", error);

    return {
      status: "error",
      message: "Failed to create experience",
    };
  }
}
