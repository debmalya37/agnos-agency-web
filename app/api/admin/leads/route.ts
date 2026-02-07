import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

// --- GET: Fetch all leads ---
export async function GET() {
  await connectDB();
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// --- PATCH: Update lead status ---
export async function PATCH(req: Request) {
  await connectDB();
  try {
    const { id, status } = await req.json();
    const updatedLead = await Lead.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    return NextResponse.json(updatedLead);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// --- DELETE: Remove a lead ---
export async function DELETE(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}