"use client";

import { createCampaign } from "@/lib/actions/createCampaign";

export default function NewCampaignPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Campaign</h1>
      <form action={createCampaign} className="space-y-4">
        <input name="name" placeholder="Campaign Name (e.g. Q1 Growth)" className="w-full border p-3 rounded" required />
        <input name="metric" placeholder="Key Metric (e.g. ROAS 4.0x)" className="w-full border p-3 rounded" required />
        <input name="lift" placeholder="Lift (e.g. +20%)" className="w-full border p-3 rounded" required />
        <input name="budget" placeholder="Budget (e.g. $10k)" className="w-full border p-3 rounded" required />
        
        <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold">
          Add Campaign
        </button>
      </form>
    </div>
  );
}