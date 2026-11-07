// app/utils/requiredUser.ts
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requiredUser() {
  let session;

  try {
    session = await auth();
  } catch (error) {
    console.warn("Authentication unavailable. Check your internet/database connection.");
    redirect("/login?error=auth-unavailable");
  }

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}