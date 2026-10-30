import "server-only";
import prisma from "@/lib/prisma";

export async function getAllCompanyById(companyId: string) {
  try {
    const alljobbycompany = await prisma.job.findMany({
      where: {
        companyId,
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
            id: true,
            location: true,
            website: true,
            xAccount: true,
            about: true,
          },
        },
      },
    });

    return alljobbycompany;
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    throw error;
  }
}

export type getAllCompanyByIdType =
  Awaited<ReturnType<typeof getAllCompanyById>>;

export type getAllCompanyByIdTypeOne =
  getAllCompanyByIdType[number];