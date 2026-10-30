"use server";

import { requiredUser } from "@/app/utils/requiredUser";
import { companySchema } from "@/app/utils/zodSchema";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { z } from "zod";

export async function EditCompanyProfile(
  data: z.infer<typeof companySchema>,
  companyId: string
): Promise<ApiResponse> {
  try {
    // Authenticate user
    const user = await requiredUser();

    // Validate submitted data
    const validateData = companySchema.parse(data);

    // Verify ownership and update company
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!company) {
      return {
        status: "error",
        message: "Company not found or you are not authorized to edit it.",
      };
    }

    await prisma.company.update({
      where: {
        id: company.id,
      },
      data: {
        name: validateData.name,
        location: validateData.location,
        about: validateData.about,
        logo: validateData.logo?.url,
        website: validateData.website,
        xAccount: validateData.xAccount,
        linkedin: validateData.linkedin,
        employes: validateData.employes,
      },
    });

    return {
      status: "success",
      message: "Company profile updated successfully.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Please check your company information and try again.",
      };
    }

    console.error("EditCompanyProfile error:", error);

    return {
      status: "error",
      message: "Failed to update company profile.",
    };
  }
}
