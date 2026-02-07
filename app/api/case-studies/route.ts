import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import CaseStudy from "@/models/CaseStudy";

export async function GET() {
  await connectDB();

  const caseStudies = await CaseStudy.find({ status: "published" })
    .sort({ featured: -1, publishedAt: -1 })
    .select("title slug coverImage excerpt industry");

  return NextResponse.json(caseStudies);
}
