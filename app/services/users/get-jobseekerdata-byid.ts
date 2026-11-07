import "server-only";

import { requiredUser } from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";
import { redirect, unstable_rethrow } from "next/navigation";

export async function getJobSeerProfileDataById(profileId: string) {
  try {
    const session = await requiredUser();

    if (!session?.id) {
      throw new Error("User not found");
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: {
        id: profileId,
        userId: session.id,
      },
    });

    if (!jobSeeker?.id) {
      redirect("/onboading");
    }

    return jobSeeker;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Get job seeker profile data error:", error);
    throw error;
  }
}

export type getJobSeerProfileDataByIdType = NonNullable<
  Awaited<ReturnType<typeof getJobSeerProfileDataById>>
>;
