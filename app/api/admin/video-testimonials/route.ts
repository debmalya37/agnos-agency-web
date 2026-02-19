import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import VideoTestimonial from "@/models/VideoTestimonial";

// Helper to extract YouTube Video ID (handles regular and Shorts)
const extractYTId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export async function GET() {
  await connectDB();
  try {
    // .lean() strips heavy Mongoose wrappers, making it 5x faster
    const videos = await VideoTestimonial.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const data = await req.json();
    const videoId = extractYTId(data.youtubeUrl);
    
    if (!videoId) return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });

    const newVideo = await VideoTestimonial.create({ ...data, videoId });
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}