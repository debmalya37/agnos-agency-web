"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Check against env variables
  if (
    username === process.env.ADMIN_USER && 
    password === process.env.ADMIN_PASS
  ) {
    // Set a secure cookie valid for 7 days
    cookies().set("admin_session", "true", { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });
    
    redirect("/admin");
  }

  return { error: "Invalid credentials" };
}

export async function logoutAction() {
  cookies().delete("admin_session");
  redirect("/admin/login");
}