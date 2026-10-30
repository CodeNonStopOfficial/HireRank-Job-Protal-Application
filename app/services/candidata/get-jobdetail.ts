import prisma from "@/lib/prisma";

export async function JobDescriptionData(jobId: string) {
    try {
        const data = await prisma.job.findFirst({
            where: {
                id: jobId,
                status: "PUBLISHED",
            },
            include: {
                company : true,
            },
        });

        if (!data) {
            return {
                success: false,
                message: "Job not found or not published",
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("Error fetching job description:", error);

        return {
            success: false,
            message: "Failed to fetch job description",
            data: null,
        };
    }
}

export type JobDescriptionDataType = NonNullable<Awaited<ReturnType<typeof JobDescriptionData>>>;
