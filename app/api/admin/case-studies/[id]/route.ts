import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import CaseStudy from "@/models/CaseStudy";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await req.json();

  const updated = await CaseStudy.findByIdAndUpdate(
    params.id,
    {
      ...data,
      publishedAt:
        data.status === "published" ? new Date() : undefined,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await CaseStudy.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
