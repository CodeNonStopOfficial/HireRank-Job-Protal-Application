"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requiredUser } from "../utils/requiredUser";
import { requireCompany } from "../utils/requiredCompany";

export async function toggleJobBookmark(jobId: string) {
  const session = await requiredUser();

  if (!session.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.id;

  const existingBookmark = await prisma.jobBookmark.findUnique({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });

  if (existingBookmark) {
    await prisma.jobBookmark.delete({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
    });
    const remainingBookmarks = await prisma.jobBookmark.count({
      where: {
        jobId,
      },
    });

    // Set false only when no users have bookmarked the job
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        isBookmarked: remainingBookmarks > 0,
      },
    });
  } else {
    await prisma.jobBookmark.create({
      data: {
        userId,
        jobId,
      },
    });
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        isBookmarked: true,
      },
    });
  }

  revalidatePath("/employer/saved-candidates");
  revalidatePath("/");
  revalidatePath("/get-started");

  return { bookmarked: !existingBookmark };
}

// DELETE Bookmark

export async function GetBookmarkedDeleteJobs(jobId: string) {
  const session = await requireCompany();

  const company = await prisma.company.findUnique({
    where: {
      userId: session.id,
    },
    select: {
      id: true,
    },
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId: company.id,
    },
    select: {
      id: true,
    },
  });

  if (!job) {
    throw new Error("Job not found or unauthorized");
  }

  // Remove all students' bookmarks for this job.
  // Use this only if the recruiter intends to clear every bookmark.
  await prisma.jobBookmark.deleteMany({
    where: {
      jobId: job.id,
    },
  });


  revalidatePath("/employer/saved-candidates");
  revalidatePath("/");
  revalidatePath("/get-started");

  return { success: true };
}
