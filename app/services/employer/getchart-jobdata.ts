import { requireCompany } from "@/app/utils/requiredCompany";
import prisma from "@/lib/prisma";

export async function GetJobDataByCategoryChart() {
  const session = await requireCompany(); 
  const jobdata = await prisma.job.groupBy({
    by: ["department"],
    where: {
        company : {
            userId  : session.id
        },
    },
    _count: {
      _all: true,
    },
  });

  const chartData = jobdata.map((item) => ({
    category: item.department,
    jobs: item._count._all,
  }));

  return chartData;
}

export type GetJobDataByCategoryChartType = Awaited<ReturnType<typeof GetJobDataByCategoryChart>>