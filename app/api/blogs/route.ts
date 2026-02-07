import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and Content are required.' }, 
        { status: 400 }
      );
    }

    const slug = createSlug(body.title);
    
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists.' }, 
        { status: 400 }
      );
    }

    // Process Keywords: Convert "seo, nextjs, react" -> ["seo", "nextjs", "react"]
    let keywordsArray: string[] = [];
    if (body.keywords && typeof body.keywords === 'string') {
        keywordsArray = body.keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k.length > 0);
    }

    const newBlog = await Blog.create({
      ...body,
      slug,
      keywords: keywordsArray, // Save as array
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
        { error: 'Internal Server Error' }, 
        { status: 500 }
    );
  }
}

// GET: Fetch all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}