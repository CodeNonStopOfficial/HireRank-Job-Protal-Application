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

    const { companyLogo, ...experienceData } = validatedData.data;

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

export async function UpdateExprienceFormMethod(
  data: createExprienceSchemaType,
  experienceId: string,
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

    const { companyLogo, ...experienceData } = validatedData.data;

    await prisma.experience.update({
      where: {
        id: experienceId,
        jobSeekerId: jobSeeker.id,
      },
      data: {
        ...experienceData,
        companyLogo: companyLogo?.url ?? "",
      },
    });

    return {
      status: "success",
      message: "Experience Updated successfully",
    };
  } catch (error) {
    console.error("Udated experience error:", error);

    return {
      status: "error",
      message: "Failed to create experience",
    };
  }
}



export async function DeleteExprienceFormMethod(
  experienceId: string
) {
  try {
    const session = await requiredUser();

    if (!session.id) {
      return {
        status: "error",
        message: "Unauthorized user",
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

    const experience = await prisma.experience.findFirst({
      where: {
        id: experienceId,
        jobSeekerId: jobSeeker.id,
      },
      select: {
        id: true,
      },
    });

    if (!experience) {
      return {
        status: "error",
        message: "Experience not found",
      };
    }

    await prisma.experience.delete({
      where: {
        id: experience.id,
      },
    });

    return {
      status: "success",
      message: "Experience deleted successfully",
    };
  } catch (error) {
    console.error("Delete experience error:", error);

    return {
      status: "error",
      message: "Failed to delete experience",
    };
  }
}
