import { requireCompany } from "@/app/utils/requiredCompany";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    const session = await requireCompany();
    if (session.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {planId} = await request.json();
  } catch (error) {}
}
