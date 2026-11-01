import "server-only";
import { requiredUser } from "@/app/utils/requiredUser";
import prisma from "@/lib/prisma";

export async function getUserDataPerUser() {
  try {
    const session = await requiredUser();

    if (!session?.id) {
      throw new Error("Unauthorized access");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      include : {
        jobSeeker : {
          include : {
             experience : {
               orderBy : {
                 startDate : "desc"
               }
             },
             education : {
              orderBy : {
                startDate : "desc"
              }
             }
          }
        }
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;

  } catch (error) {
    console.error("Get user data error:", error);

    throw error;
  }
}

export type getUserDataPerUserType = Awaited<ReturnType<typeof getUserDataPerUser>>