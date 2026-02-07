"use client";

import { createLead } from "@/lib/actions/createLead";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    const result = await createLead(formData);
    if (result.success) {
      setStatus("Thanks! We'll be in touch.");
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl border">
      <div>
        <label className="block text-sm font-bold mb-2">Name</label>
        <input name="name" required className="w-full border p-2 rounded" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Email</label>
        <input name="email" type="email" required className="w-full border p-2 rounded" placeholder="john@example.com" />
      </div>
      <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded font-bold">
        Submit Inquiry
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}