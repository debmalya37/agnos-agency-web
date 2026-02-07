import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

// PUT: Update a blog post
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params; // Sync params for Next.js 14
    const body = await req.json();

    // 1. Check if blog exists first
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // 2. Process Keywords (String "seo, react" -> Array ["seo", "react"])
    let keywordsArray = existingBlog.keywords; // Default to existing
    if (body.keywords && typeof body.keywords === 'string') {
        keywordsArray = body.keywords
            .split(',')
            .map((k: string) => k.trim())
            .filter((k: string) => k.length > 0);
    } else if (Array.isArray(body.keywords)) {
        // In case the frontend sends an array directly
        keywordsArray = body.keywords;
    }

    // 3. Update the Blog
    // Note: We generally do NOT auto-update the slug when the title changes 
    // to prevent breaking existing SEO links.
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...body,
        keywords: keywordsArray,
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json(updatedBlog, { status: 200 });

  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a blog post
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params; // Sync params for Next.js 14

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


// GET: Fetch a single blog by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params; 

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}