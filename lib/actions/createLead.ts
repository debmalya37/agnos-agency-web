"use server";

import connectDB from "@/lib/db";
import  Lead  from "@/models/Lead";
import { revalidatePath } from "next/cache";

export async function createLead(formData: FormData) {
  await connectDB();

  const nameEntry = formData.get("name");
  const emailEntry = formData.get("email");
  const subjectEntry = formData.get("subject");
  const messageEntry = formData.get("message");

  const name = typeof nameEntry === "string" ? nameEntry.trim() : "";
  const email = typeof emailEntry === "string" ? emailEntry.trim() : "";
  const subject = typeof subjectEntry === "string" ? subjectEntry.trim() : undefined;
  const message =
    typeof messageEntry === "string" && messageEntry.trim()
      ? messageEntry.trim()
      : "Website contact form submission.";

  try {
    if (!name || !email) {
      return { success: false, message: "Name and email are required." };
    }

    // 1. Create the new lead in MongoDB
    await Lead.create({
      name,
      email,
      subject,
      message,
      status: "new",
    });

    // 2. Refresh the admin dashboard so the new lead shows up immediately
    revalidatePath("/admin");
    
    return { success: true, message: "Lead submitted successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to submit lead." };
  }
}
