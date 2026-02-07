import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CaseStudy from "@/models/CaseStudy";
import { slugify } from "@/lib/slugify"; // Assuming this utility exists, otherwise use a helper function

// --- GET: Fetch All or Single Case Study ---
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // 1. Fetch SINGLE document by ID (Returns Object)
      // We do NOT use .select() here because the Edit page needs all fields
      const caseStudy = await CaseStudy.findById(id);
      
      if (!caseStudy) {
        return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
      }
      
      return NextResponse.json(caseStudy);
    } else {
      // 2. Fetch ALL documents (Returns Array)
      // You can keep .select() here to optimize the list view payload
      const caseStudies = await CaseStudy.find({})
        .sort({ createdAt: -1 })
        .select("title status featured clientName coverImage createdAt slug");
        
      return NextResponse.json(caseStudies);
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// --- POST: Create New Case Study ---
export async function POST(req: Request) {
  await connectDB();
  
  try {
    const data = await req.json();

    // Generate slug from title if not provided
    const slug = data.slug || slugify(data.title);

    // Check for duplicate slugs
    const exists = await CaseStudy.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: "A case study with this title already exists." }, { status: 400 });
    }

    const caseStudy = await CaseStudy.create({
      ...data,
      slug,
      publishedAt: data.status === "published" ? new Date() : null,
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error: any) {
    console.error("Create Error:", error);
    // Return specific validation message if available
    return NextResponse.json({ message: error.message || "Failed to create case study" }, { status: 400 });
  }
}

// --- PUT: Update Existing Case Study ---
export async function PUT(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required for update" }, { status: 400 });
  }

  try {
    const data = await req.json();

    // Optional: Re-generate slug if title changed (usually better to keep slug stable for SEO)
    // const slug = slugify(data.title); 

    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      { 
        ...data, 
        updatedAt: new Date(),
        // If status changed to published, set publishedAt if not already set
        ...(data.status === 'published' ? { publishedAt: new Date() } : {}) 
      },
      { new: true, runValidators: true } // Return updated doc & run schema validation
    );

    if (!updatedCaseStudy) {
      return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCaseStudy);
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: error.message || "Failed to update" }, { status: 400 });
  }
}

// --- DELETE: Remove Case Study ---
export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required for deletion" }, { status: 400 });
  }

  try {
    const deleted = await CaseStudy.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Case Study not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Case Study deleted successfully" });
  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}