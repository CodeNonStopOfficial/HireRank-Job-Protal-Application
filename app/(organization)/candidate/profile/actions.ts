"use server";

import { requiredUser } from "@/app/utils/requiredUser";
import {
  createExprienceSchema,
  createExprienceSchemaType,
  educationSchema,
  EducationSchemaType,
  userProfileSchema,
  userProfileSchemaType,
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
        companyLogo: companyLogo?.url,
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
        companyLogo: companyLogo?.url,
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

export async function DeleteExprienceFormMethod(experienceId: string) {
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

// Education Action

export async function CreateEducationMethod(
  data: EducationSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await requiredUser();
    if (!session.id) {
      return {
        status: "error",
        message: "User Not Found",
      };
    }
    const validationData = educationSchema.safeParse(data);
    if (!validationData.success) {
      return {
        status: "error",
        message: validationData.error.issues
          .map((issue) => issue.message)
          .join(", "),
      };
    }
    const seeker = await prisma.jobSeeker.findUnique({
      where: {
        userId: session.id,
      },
      select: {
        id: true,
      },
    });
    if (!seeker) {
      return {
        status: "error",
        message: "Job seeker profile not found",
      };
    }
    const { collegeLogo, ...educationDatas } = validationData.data;
    await prisma.education.create({
      data: {
        ...educationDatas,
        collegeLogo: collegeLogo?.url,
        jobSeeker: {
          connect: {
            id: seeker.id,
          },
        },
      },
    });
    return {
      status: "success",
      message: "Education Created Successfully",
    };
  } catch (error) {
    console.log("Failed to Education Creating Error", error);
    return {
      status: "error",
      message: "Failed to create education",
    };
  }
}

export async function UpdateEducationMethod(
  data: EducationSchemaType,
  educationId: string,
): Promise<ApiResponse> {
  try {
    const session = await requiredUser();
    if (!session.id) {
      return {
        status: "error",
        message: "User Not Found",
      };
    }
    const validationData = educationSchema.safeParse(data);
    if (!validationData.success) {
      return {
        status: "error",
        message: validationData.error.issues
          .map((issue) => issue.message)
          .join(", "),
      };
    }
    const seeker = await prisma.jobSeeker.findUnique({
      where: {
        userId: session.id,
      },
      select: {
        id: true,
      },
    });
    if (!seeker) {
      return {
        status: "error",
        message: "Job seeker profile not found",
      };
    }
    const { collegeLogo, ...educationDatas } = validationData.data;
    await prisma.education.update({
      where: {
        id: educationId,
        jobSeekerId: seeker.id,
      },
      data: {
        ...educationDatas,
        collegeLogo: collegeLogo?.url,
      },
    });
    return {
      status: "success",
      message: "Education Updated Successfully",
    };
  } catch (error) {
    console.log("Failed to Education Updating Error", error);
    return {
      status: "error",
      message: "Failed to Update Education",
    };
  }
}

export async function DeleteEducationFormMethod(educationId: string) {
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

    const education = await prisma.education.findFirst({
      where: {
        id: educationId,
        jobSeekerId: jobSeeker.id,
      },
      select: {
        id: true,
      },
    });

    if (!education) {
      return {
        status: "error",
        message: "Education not found",
      };
    }

    await prisma.education.delete({
      where: {
        id: education.id,
      },
    });

    return {
      status: "success",
      message: "Education deleted successfully",
    };
  } catch (error) {
    console.error("Delete Educaiton error:", error);

    return {
      status: "error",
      message: "Failed to delete education",
    };
  }
}

export async function UpdateProfileJobSeeker(
  data: userProfileSchemaType,
  seekerId: string,
): Promise<ApiResponse> {
  try {
    const session = await requiredUser();
    if (!session.id) {
      return {
        status: "error",
        message: "User Not Found",
      };
    }
    const validationData = userProfileSchema.safeParse(data);
    if (!validationData.success) {
      return {
        status: "error",
        message: validationData.error.issues
          .map((issue) => issue.message)
          .join(" ,"),
      };
    }

    const jobSeeker = await prisma.jobSeeker.findFirst({
      where: {
        id: seekerId,
      },
      select: {
        id: true,
      },
    });
    if (!jobSeeker?.id) {
      return {
        status: "error",
        message: "JobSeer Not Found",
      };
    }
    await prisma.jobSeeker.update({
      where: {
        id: jobSeeker.id,
      },
      data: {
        name: validationData.data.name,
        phone: validationData.data.phone,
        headline: validationData.data.headline,
        about: validationData.data.about,
        linkeding: validationData.data.linkedingUrl,
        githubUrl: validationData.data.linkedingUrl,
        xAccount: validationData.data.xAccountUrl,
        website: validationData.data.websiteUrl,
        location: validationData.data.location,
        goal: validationData.data.goal,
        skills: validationData.data.skills,
        resume: validationData.data.resume?.url,
      },
    });

    return {
      status: "success",
      message: "Profile Updated Successfully",
    };
  } catch (error) {
    console.error("Update JobSeeker Profile ERROR:", error);

    return {
      status: "error",
      message: "Failed to Update JobSeeker Profile",
    };
  }
}
