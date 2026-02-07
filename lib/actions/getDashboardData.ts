import connectDB from "@/lib/db";
import  Lead  from "@/models/Lead";
import { Campaign } from "@/models/Campaign";

export async function getDashboardData() {
  await connectDB();

  // 1. Fetch Data in Parallel for Speed
  const [leads, campaigns, totalLeadsCount] = await Promise.all([
    Lead.find({}).sort({ createdAt: -1 }).limit(5), // Recent 5 leads
    Campaign.find({ active: true }).limit(3),
    Lead.countDocuments({}),
  ]);

  // 2. Calculate KPI: Pipeline (Example Logic)
  const pipelineStages = await Lead.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Format Pipeline for the UI
  // Note: In a real app, ensure all stages exist even if count is 0
  const pipelineData = pipelineStages.map((stage) => ({
    label: stage._id,
    value: stage.count,
  }));

  // 3. Calculate KPI: New Leads Change (Mocking "Lift" logic)
  // In a real app, you'd query 'created this week' vs 'created last week'
  const newLeadsValue = totalLeadsCount.toString(); 

  return {
    kpiCards: [
      {
        label: "New Leads",
        value: newLeadsValue, // Real data
        change: "+18.4%", // (You would calculate this)
        trend: "up",
        note: "All time total",
      },
      // ... keep other static KPIs until you have models for them
      {
        label: "Qualified Opportunities",
        value: "68",
        change: "+9.2%",
        trend: "up",
        note: "Pipeline velocity",
      },
      {
        label: "Campaign ROI",
        value: "3.9x",
        change: "+0.6x",
        trend: "up",
        note: "Median across campaigns",
      },
      {
        label: "Client Retention",
        value: "96%",
        change: "+2.1%",
        trend: "up",
        note: "Last 90 days",
      },
    ],
    recentLeads: JSON.parse(JSON.stringify(leads)), // Serialize for Next.js
    pipeline: pipelineData,
    campaigns: JSON.parse(JSON.stringify(campaigns)),
  };
}