"use server";

import connectDB from "@/lib/db";
import { Campaign } from "@/models/Campaign";
import { revalidatePath } from "next/cache";

export async function createCampaign(formData: FormData) {
  await connectDB();

  try {
    await Campaign.create({
      name: formData.get("name"),
      metric: formData.get("metric"), // e.g. "CTR 4.5%"
      lift: formData.get("lift"),     // e.g. "+12%"
      budget: formData.get("budget"), // e.g. "$5,000"
      active: true,
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}