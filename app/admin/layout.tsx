import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  FileText,
  LayoutDashboard,
  Mail,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Case Studies", href: "/admin/case-studies", icon: FileText },
  { label: "Clients", href: "/admin/clients", icon: Briefcase },
  { label: "Inbox", href: "/admin/inbox", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute right-[-12rem] top-[12rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-[140px]" />
        <div className="absolute bottom-[-12rem] left-[20%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-[150px]" />
      </div>

      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-800/70 bg-slate-950/70 px-6 py-8 backdrop-blur lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300">
              <span className="text-lg font-semibold">A</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Aitek Agency
              </p>
              <p className="text-lg font-semibold">Admin Suite</p>
            </div>
          </div>

          <nav className="mt-10 space-y-1 text-sm">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-900/70 hover:text-white"
                >
                  <Icon size={18} className="text-emerald-300" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 text-xs text-slate-400">
            <p className="text-sm font-semibold text-slate-200">Growth Pulse</p>
            <p className="mt-2 leading-relaxed">
              Weekly performance digest is ready. Share the report with your
              client leads.
            </p>
            <button className="mt-4 w-full rounded-xl bg-emerald-400/90 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              Generate Report
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/70 bg-slate-950/60 px-6 py-5 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Marketing Operations
              </p>
              <h1 className="text-2xl font-semibold">Operations Hub</h1>
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <input
                placeholder="Search campaigns, leads, teams"
                className="h-11 w-full rounded-xl border border-slate-800/70 bg-slate-950/80 px-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400/70 focus:outline-none sm:w-64"
              />
              <button className="hidden h-11 rounded-xl border border-slate-800/70 px-4 text-sm font-semibold text-slate-200 transition hover:border-emerald-400/70 hover:text-emerald-200 sm:inline-flex">
                New Lead
              </button>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
