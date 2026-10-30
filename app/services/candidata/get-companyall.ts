
import prisma from "@/lib/prisma";

export async function getAllCompanyAndWithJobs() {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
        xAccount : true,
        website : true,
        location : true,
        about : true,
        _count: {
          select: {
            jobs: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return companies;
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    throw new Error("Unable to fetch companies");
  }
}

export type getAllCompanyAndWithJobsType = Awaited<ReturnType<typeof getAllCompanyAndWithJobs>>;
export type getAllCompanyType = Awaited<ReturnType<typeof getAllCompanyAndWithJobs>>[0];