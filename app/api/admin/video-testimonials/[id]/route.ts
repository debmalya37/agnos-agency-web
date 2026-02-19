import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VideoTestimonial from "@/models/VideoTestimonial";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    await VideoTestimonial.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}