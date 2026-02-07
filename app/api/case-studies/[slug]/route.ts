import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudy from "@/models/CaseStudy";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  // In Next.js 15, params is a Promise
  const { slug } = await params;

  try {
    const caseStudy = await CaseStudy.findOne({
      slug: slug,
      status: "published",
    });

    if (!caseStudy) {
      return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}