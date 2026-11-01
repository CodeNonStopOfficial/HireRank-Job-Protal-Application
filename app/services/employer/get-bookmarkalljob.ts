import { requireCompany } from "@/app/utils/requiredCompany";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


export async function GetBookmarkedAllJobs() {
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
    notFound();
  }

  const jobs = await prisma.job.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      company: {
         select : {
           id : true,
           name : true,
           logo : true
         }
      },
      _count: {
        select: {
          jobBookmarks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
}

export type GetBookmarkedAllJobsType = Awaited<
  ReturnType<typeof GetBookmarkedAllJobs>
>;

export type GetBookmarkedAllJobsTypeOne = GetBookmarkedAllJobsType[number];
