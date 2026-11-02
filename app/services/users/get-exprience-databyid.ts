
import "server-only";

import { requiredUser } from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";

export async function getExperienceDataById(experienceId: string) {
  try {
    const session = await requiredUser();

    if (!session?.id) {
      throw new Error("User not found");
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
      throw new Error("Job seeker profile not found");
    }

    const experience = await prisma.experience.findFirst({
      where: {
        id: experienceId,
        jobSeekerId: jobSeeker.id,
      },
    });

    if (!experience) {
      throw new Error("Experience not found");
    }

    return experience;
  } catch (error) {
    console.error("Get experience data error:", error);
    throw error;
  }
}

export type GetExperienceDataByIdType = NonNullable<
  Awaited<ReturnType<typeof getExperienceDataById>>
>;
