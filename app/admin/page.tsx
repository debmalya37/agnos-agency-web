import Link from "next/link";
import { getDashboardData } from "@/lib/actions/getDashboardData";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  Globe2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Keep these static for now until you create models for Tasks/Analytics
const TASKS = [
  "Finalize healthcare GTM brief for Remedy Wellness",
  "Review paid social creatives with Growth Ops",
  "Send weekly analytics digest to top 5 clients",
  "QA landing page experiment for Atlas Cloud",
];

const TOP_PAGES = [
  { page: "/services/paid-media", views: "18.4k", conv: "6.1%" },
  { page: "/case-studies/harbor-finance", views: "12.9k", conv: "8.4%" },
  { page: "/insights/saas-growth", views: "9.7k", conv: "5.2%" },
];

export default async function AdminDashboardPage() {
  // 1. Fetch Real Data from MongoDB
  const { kpiCards, recentLeads, pipeline, campaigns } = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* --- TOP SECTION: KPIs & PIPELINE --- */}
      <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-[0_0_40px_-20px_rgba(16,185,129,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                Agency Pulse
              </p>
              <h2 className="text-2xl font-semibold">Revenue Momentum</h2>
              <p className="mt-1 text-sm text-slate-400">
                Live performance data from database.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarClock size={16} className="text-emerald-300" />
              Updated just now
            </div>
          </div>

          {/* DYNAMIC KPI CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((card: any) => (
              <div
                key={card.label}
                className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{card.label}</span>
                  <TrendingUp size={14} className="text-emerald-300" />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-2xl font-semibold">{card.value}</p>
                  <span className="text-xs text-emerald-300">{card.change}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{card.note}</p>
              </div>
            ))}
          </div>

          {/* DYNAMIC PIPELINE */}
          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Pipeline Distribution
                </p>
                <p className="text-xs text-slate-400">
                  Active opportunities by stage.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300">
                View Forecast
                <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {pipeline.length > 0 ? (
                pipeline.map((stage: any) => (
                  <div
                    key={stage.label}
                    className="rounded-xl border border-slate-800/60 bg-slate-950/50 px-4 py-3"
                  >
                    <p className="text-xs text-slate-500">{stage.label}</p>
                    <p className="mt-2 text-xl font-semibold">{stage.value}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-4 text-sm text-slate-500 bg-slate-950/30 rounded-xl border border-dashed border-slate-800">
                  No active pipeline data found. Add leads to see stats.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- LEAD SOURCES (Static for now, dynamic values) --- */}
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Lead Quality
              </p>
              <h2 className="text-xl font-semibold">Source Mix</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200">
              <Filter size={14} />
              Filters
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {[
              { label: "Paid Social", value: 72, color: "bg-emerald-400" },
              { label: "Organic Search", value: 58, color: "bg-sky-400" },
              { label: "Partnerships", value: 44, color: "bg-indigo-400" },
              { label: "Email Nurture", value: 36, color: "bg-amber-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-800">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/20 text-sky-200">
                <Globe2 size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Global traffic lift</p>
                <p className="text-xs text-slate-400">
                  Multi-region SEO tests are outperforming 4 of 6 markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MIDDLE SECTION: RECENT LEADS (Dynamic) & TASKS --- */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Live Leads
              </p>
              <h2 className="text-xl font-semibold">High-intent pipeline</h2>
            </div>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-4 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200"
            >
              View All
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead: any) => (
                <div
                  key={lead._id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{lead.name}</p>
                    <p className="text-xs text-slate-500">
                      {lead.source} · {lead.owner || "Unassigned"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                      {lead.status}
                    </span>
                    <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                      Score {lead.score}
                    </span>
                    <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                      {lead.tag}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                No leads found. Check your database connection or add a lead.
              </div>
            )}
          </div>
        </div>

        {/* --- TASKS (Static) --- */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Active Tasks
                </p>
                <h2 className="text-xl font-semibold">Ops checklist</h2>
              </div>
              <CheckCircle2 size={18} className="text-emerald-300" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {TASKS.map((task) => (
                <li
                  key={task}
                  className="rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* --- DAILY BRIEFING (Static) --- */}
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Today
            </p>
            <h2 className="text-xl font-semibold">Executive briefing</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
                <Clock size={16} className="mt-1 text-emerald-300" />
                <div>
                  <p className="font-semibold text-slate-200">
                    2:00 PM · Client sync
                  </p>
                  <p className="text-xs text-slate-500">
                    Atlas Cloud: activation and Q2 roadmap.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
                <Sparkles size={16} className="mt-1 text-sky-300" />
                <div>
                  <p className="font-semibold text-slate-200">
                    Strategy workshop
                  </p>
                  <p className="text-xs text-slate-500">
                    Launch messaging refresh for Harbor Finance.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
                <Flame size={16} className="mt-1 text-amber-300" />
                <div>
                  <p className="font-semibold text-slate-200">
                    Hot lead escalation
                  </p>
                  <p className="text-xs text-slate-500">
                    Nova Commerce wants revised scope by EOD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM SECTION: CAMPAIGNS (Dynamic) & TOP PAGES --- */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Campaign Performance
              </p>
              <h2 className="text-xl font-semibold">Momentum tracker</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-4 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200">
              Export
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {campaigns.length > 0 ? (
              campaigns.map((campaign: any) => (
                <div
                  key={campaign._id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{campaign.name}</p>
                    <p className="text-xs text-slate-500">{campaign.metric}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                      {campaign.lift}
                    </span>
                    <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1">
                      {campaign.budget}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-slate-500">
                No active campaigns found.
              </div>
            )}
          </div>
        </div>

        {/* --- TOP PAGES (Static) --- */}
        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Top Pages
          </p>
          <h2 className="text-xl font-semibold">Revenue drivers</h2>
          <div className="mt-5 space-y-3">
            {TOP_PAGES.map((page) => (
              <div
                key={page.page}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-200">{page.page}</p>
                  <p className="text-xs text-slate-500">{page.views} views</p>
                </div>
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
                  {page.conv} conv.
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}














// import Link from "next/link";
// import {
//   ArrowUpRight,
//   CalendarClock,
//   CheckCircle2,
//   Clock,
//   Filter,
//   Flame,
//   Globe2,
//   Sparkles,
//   TrendingUp,
//   Users2,
// } from "lucide-react";

// const KPI_CARDS = [
//   {
//     label: "New Leads",
//     value: "214",
//     change: "+18.4%",
//     trend: "up",
//     note: "7-day lift",
//   },
//   {
//     label: "Qualified Opportunities",
//     value: "68",
//     change: "+9.2%",
//     trend: "up",
//     note: "Pipeline velocity",
//   },
//   {
//     label: "Campaign ROI",
//     value: "3.9x",
//     change: "+0.6x",
//     trend: "up",
//     note: "Median across campaigns",
//   },
//   {
//     label: "Client Retention",
//     value: "96%",
//     change: "+2.1%",
//     trend: "up",
//     note: "Last 90 days",
//   },
// ];

// const LEADS = [
//   {
//     name: "Remedy Wellness",
//     owner: "Talia Brooks",
//     source: "Inbound / SEO",
//     stage: "Discovery",
//     score: 86,
//     tag: "High Intent",
//   },
//   {
//     name: "Atlas Cloud",
//     owner: "Omar Reyes",
//     source: "LinkedIn Outreach",
//     stage: "Proposal",
//     score: 79,
//     tag: "Decision Maker",
//   },
//   {
//     name: "Nova Commerce",
//     owner: "Fiona Park",
//     source: "Partner Referral",
//     stage: "Negotiation",
//     score: 92,
//     tag: "Enterprise",
//   },
//   {
//     name: "Harbor Finance",
//     owner: "Caleb Grant",
//     source: "Webinar",
//     stage: "Qualification",
//     score: 73,
//     tag: "Growth Tier",
//   },
// ];

// const PIPELINE = [
//   { label: "Qualified", value: 38 },
//   { label: "Proposal", value: 27 },
//   { label: "Negotiation", value: 19 },
//   { label: "Closed Won", value: 12 },
// ];

// const CAMPAIGNS = [
//   {
//     name: "Q1 Demand Surge",
//     metric: "CTR 4.1%",
//     lift: "+22%",
//     budget: "$28.4k",
//   },
//   {
//     name: "ABM Fintech",
//     metric: "MQL 312",
//     lift: "+16%",
//     budget: "$19.2k",
//   },
//   {
//     name: "C-Suite Nurture",
//     metric: "CPL $64",
//     lift: "-9%",
//     budget: "$12.9k",
//   },
// ];

// const TASKS = [
//   "Finalize healthcare GTM brief for Remedy Wellness",
//   "Review paid social creatives with Growth Ops",
//   "Send weekly analytics digest to top 5 clients",
//   "QA landing page experiment for Atlas Cloud",
// ];

// const TOP_PAGES = [
//   { page: "/services/paid-media", views: "18.4k", conv: "6.1%" },
//   { page: "/case-studies/harbor-finance", views: "12.9k", conv: "8.4%" },
//   { page: "/insights/saas-growth", views: "9.7k", conv: "5.2%" },
// ];

// export default function AdminDashboardPage() {
//   return (
//     <div className="space-y-8">
//       <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
//         <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-[0_0_40px_-20px_rgba(16,185,129,0.4)]">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
//                 Agency Pulse
//               </p>
//               <h2 className="text-2xl font-semibold">Revenue Momentum</h2>
//               <p className="mt-1 text-sm text-slate-400">
//                 30-day performance across paid, lifecycle, and ABM programs.
//               </p>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-slate-400">
//               <CalendarClock size={16} className="text-emerald-300" />
//               Updated 2 hours ago
//             </div>
//           </div>

//           <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {KPI_CARDS.map((card) => (
//               <div
//                 key={card.label}
//                 className="rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4"
//               >
//                 <div className="flex items-center justify-between text-xs text-slate-400">
//                   <span>{card.label}</span>
//                   <TrendingUp size={14} className="text-emerald-300" />
//                 </div>
//                 <div className="mt-3 flex items-baseline gap-2">
//                   <p className="text-2xl font-semibold">{card.value}</p>
//                   <span className="text-xs text-emerald-300">{card.change}</span>
//                 </div>
//                 <p className="mt-2 text-xs text-slate-500">{card.note}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 rounded-2xl border border-slate-800/60 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 p-5">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div>
//                 <p className="text-sm font-semibold text-slate-200">
//                   Pipeline velocity is accelerating
//                 </p>
//                 <p className="text-xs text-slate-400">
//                   Qualified opportunities are closing 12% faster week-over-week.
//                 </p>
//               </div>
//               <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-400/90 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-300">
//                 View Forecast
//                 <ArrowUpRight size={14} />
//               </button>
//             </div>
//             <div className="mt-5 grid gap-3 sm:grid-cols-4">
//               {PIPELINE.map((stage) => (
//                 <div
//                   key={stage.label}
//                   className="rounded-xl border border-slate-800/60 bg-slate-950/50 px-4 py-3"
//                 >
//                   <p className="text-xs text-slate-500">{stage.label}</p>
//                   <p className="mt-2 text-xl font-semibold">{stage.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//                 Lead Quality
//               </p>
//               <h2 className="text-xl font-semibold">Source Mix</h2>
//             </div>
//             <button className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200">
//               <Filter size={14} />
//               Filters
//             </button>
//           </div>

//           <div className="mt-6 space-y-4">
//             {[
//               { label: "Paid Social", value: 72, color: "bg-emerald-400" },
//               { label: "Organic Search", value: 58, color: "bg-sky-400" },
//               { label: "Partnerships", value: 44, color: "bg-indigo-400" },
//               { label: "Email Nurture", value: 36, color: "bg-amber-400" },
//             ].map((item) => (
//               <div key={item.label}>
//                 <div className="flex items-center justify-between text-xs text-slate-400">
//                   <span>{item.label}</span>
//                   <span>{item.value}%</span>
//                 </div>
//                 <div className="mt-2 h-2 rounded-full bg-slate-800">
//                   <div
//                     className={`h-2 rounded-full ${item.color}`}
//                     style={{ width: `${item.value}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4">
//             <div className="flex items-center gap-3">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/20 text-sky-200">
//                 <Globe2 size={18} />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">Global traffic lift</p>
//                 <p className="text-xs text-slate-400">
//                   Multi-region SEO tests are outperforming 4 of 6 markets.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
//         <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//                 Live Leads
//               </p>
//               <h2 className="text-xl font-semibold">High-intent pipeline</h2>
//             </div>
//             <Link
//               href="/admin/leads"
//               className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-4 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200"
//             >
//               View All
//               <ArrowUpRight size={14} />
//             </Link>
//           </div>

//           <div className="mt-5 space-y-3">
//             {LEADS.map((lead) => (
//               <div
//                 key={lead.name}
//                 className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4"
//               >
//                 <div>
//                   <p className="text-sm font-semibold">{lead.name}</p>
//                   <p className="text-xs text-slate-500">
//                     {lead.source} · {lead.owner}
//                   </p>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-3">
//                   <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
//                     {lead.stage}
//                   </span>
//                   <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
//                     Score {lead.score}
//                   </span>
//                   <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
//                     {lead.tag}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//                   Active Tasks
//                 </p>
//                 <h2 className="text-xl font-semibold">Ops checklist</h2>
//               </div>
//               <CheckCircle2 size={18} className="text-emerald-300" />
//             </div>
//             <ul className="mt-4 space-y-3 text-sm text-slate-300">
//               {TASKS.map((task) => (
//                 <li
//                   key={task}
//                   className="rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3"
//                 >
//                   {task}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//             <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//               Today
//             </p>
//             <h2 className="text-xl font-semibold">Executive briefing</h2>
//             <div className="mt-4 space-y-3 text-sm text-slate-300">
//               <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
//                 <Clock size={16} className="mt-1 text-emerald-300" />
//                 <div>
//                   <p className="font-semibold text-slate-200">
//                     2:00 PM · Client sync
//                   </p>
//                   <p className="text-xs text-slate-500">
//                     Atlas Cloud: activation and Q2 roadmap.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
//                 <Sparkles size={16} className="mt-1 text-sky-300" />
//                 <div>
//                   <p className="font-semibold text-slate-200">
//                     Strategy workshop
//                   </p>
//                   <p className="text-xs text-slate-500">
//                     Launch messaging refresh for Harbor Finance.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 px-4 py-3">
//                 <Flame size={16} className="mt-1 text-amber-300" />
//                 <div>
//                   <p className="font-semibold text-slate-200">
//                     Hot lead escalation
//                   </p>
//                   <p className="text-xs text-slate-500">
//                     Nova Commerce wants revised scope by EOD.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
//         <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//                 Campaign Performance
//               </p>
//               <h2 className="text-xl font-semibold">Momentum tracker</h2>
//             </div>
//             <button className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-4 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200">
//               Export
//               <ArrowUpRight size={14} />
//             </button>
//           </div>

//           <div className="mt-5 grid gap-3">
//             {CAMPAIGNS.map((campaign) => (
//               <div
//                 key={campaign.name}
//                 className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4"
//               >
//                 <div>
//                   <p className="text-sm font-semibold">{campaign.name}</p>
//                   <p className="text-xs text-slate-500">{campaign.metric}</p>
//                 </div>
//                 <div className="flex items-center gap-4 text-xs text-slate-300">
//                   <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">
//                     {campaign.lift}
//                   </span>
//                   <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1">
//                     {campaign.budget}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
//           <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
//             Top Pages
//           </p>
//           <h2 className="text-xl font-semibold">Revenue drivers</h2>
//           <div className="mt-5 space-y-3">
//             {TOP_PAGES.map((page) => (
//               <div
//                 key={page.page}
//                 className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/40 px-4 py-4 text-sm"
//               >
//                 <div>
//                   <p className="font-semibold text-slate-200">{page.page}</p>
//                   <p className="text-xs text-slate-500">{page.views} views</p>
//                 </div>
//                 <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
//                   {page.conv} conv.
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
