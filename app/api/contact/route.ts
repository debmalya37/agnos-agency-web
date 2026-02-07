import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead"; // Ensure you have the Lead model from previous steps
import { sendLeadEmail } from "@/lib/mail";

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Save to Database (Optional but recommended)
    // If you haven't set up the Lead model yet, you can comment this block out.
    try {
        await Lead.create({ name, email, subject, message, status: "new" });
    } catch (dbError) {
        console.error("Database save failed:", dbError);
        // We continue execution even if DB fails, to ensure email still tries to send
    }

    // 3. Send Email
    const emailResult = await sendLeadEmail({ name, email, subject, message });

    if (!emailResult.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}