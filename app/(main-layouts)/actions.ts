"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requiredUser } from "../utils/requiredUser";

export async function toggleJobBookmark(jobId: string){
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
    await prisma.job.update({
        where : {
            id : jobId,
        },
        data : {
            isBookmarked : false
        }
    });
  } else {
    await prisma.jobBookmark.create({
      data: {
        userId,
        jobId,
      },
    });
     await prisma.job.update({
        where : {
            id : jobId,
        },
        data : {
            isBookmarked : true
        }
    });
  }

  revalidatePath("/");
  revalidatePath("/get-started");

  return { bookmarked: !existingBookmark };
}