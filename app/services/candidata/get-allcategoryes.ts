
import prisma from "@/lib/prisma";

export async function getAllCategory() {
  try {
    const categories = await prisma.job.findMany({
      select: {
        id: true,
        department: true,
        openings: true,
      },
      orderBy: {
        department: "asc",
      },
      take : 8
    });

    const categoryMap = new Map<
      string,
      { name: string; jobCount: number }
    >();

    for (const item of categories) {
      if (item.department === null) continue;

      const existing = categoryMap.get(item.department);

      if (existing) {
        existing.jobCount += item.openings;
      } else {
        categoryMap.set(item.department, {
          name: item.department,
          jobCount: item.openings,
        });
      }
    }

    return Array.from(categoryMap.values());
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories of jobs");
  }
}

export type getAllCategoryType = Awaited<
  ReturnType<typeof getAllCategory>
>;


export async function getAllInternJobs() {
  try {
    const intern = await prisma.job.findMany({
      where: {
        employmentType: "INTERNSHIP",
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take : 5
    });

    return intern;
  } catch (error) {
    console.error("Error fetching internship jobs:", error);
    throw new Error("Failed to fetch internship jobs");
  }
}

export type GetAllInternJobsType = Awaited<
  ReturnType<typeof getAllInternJobs>
>;

export async function getAllJobsTake() {
  try {
    const jobsdata = await prisma.job.findMany({
      where: {
        status : "PUBLISHED",
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take : 5
    });

    return jobsdata;
  } catch (error) {
    console.error("Error fetching  jobs:", error);
    throw new Error("Failed to fetch internship jobs");
  }
}