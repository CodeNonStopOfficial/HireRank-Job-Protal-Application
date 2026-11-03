import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "@/lib/prisma";

export async function requiredUser() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  
  return session.user;
}
