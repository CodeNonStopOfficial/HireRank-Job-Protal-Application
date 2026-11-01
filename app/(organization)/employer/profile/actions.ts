"use server";

import { requireCompany} from "@/app/utils/requiredCompany";
import { requiredUser} from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteCompanyAction(
  companyId: string
): Promise<ApiResponse> {
  const session = await requireCompany();
  try {
    if (!companyId) {
      return {
        status: "error",
        message: "Company ID is required.",
      };
    }

    await prisma.company.delete({
      where: {
        id: companyId,
        userId : session.id
      },
    });

    await prisma.user.update({
        where :{
            id : session.id,
        },
        data : {
            role : "JOB_SEEKER",
            userType : "JOB_SEEKER"
        }
    })

    return {
      status: "success",
      message: "Company deleted successfully.",
    };
  } catch (error) {
    console.error("Delete company error:", error);

    return {
      status: "error",
      message: "Failed to delete company.",
    };
  }
}

export async function deleteCompanyAndUserAccount() : Promise<ApiResponse> {
     try {
        const session = await requiredUser();
        if(!session){
            return {
                status : "error",
                message : "User Not Found"
            }
        }
        await prisma.user.delete({
             where : {
                id : session.id,
             }
        }) 
        revalidatePath("/")
        return {
            status : "success",
            message : "Account Deleted Successfully"
        }
     } catch {
        return {
            status : "error",
            message : "Invalide Account Deleted"
        }
     }
} 