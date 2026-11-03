import "server-only";

import { requiredUser } from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";

export async function getJobSeerProfileDataById(profileId:string) {
  try {
    const session = await requiredUser();

    if (!session?.id) {
      throw new Error("User not found");
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: {
        id : profileId,
        userId: session.id,
      },
    });

    if (!jobSeeker) {
      throw new Error("JobSeeker Not Found");
    }

    return jobSeeker;
  } catch (error) {
    console.error("Get job seeker profile data error:", error);
    throw error;
  }
}

export type getJobSeerProfileDataByIdType = NonNullable<Awaited<ReturnType<typeof getJobSeerProfileDataById>>
>;
