
import "server-only";

import { requiredUser } from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";

export async function getEducationDataById(educationId: string) {
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

    const education = await prisma.education.findFirst({
      where: {
        id: educationId,
        jobSeekerId: jobSeeker.id,
      },
    });

    if (!education) {
      throw new Error("Experience not found");
    }

    return education;
  } catch (error) {
    console.error("Get experience data error:", error);
    throw error;
  }
}

export type GetEducationDataByIdType = NonNullable<
  Awaited<ReturnType<typeof getEducationDataById>>
>;
