import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/20 text-amber-200">
              <Briefcase size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Client Ledger
              </p>
              <h2 className="text-2xl font-semibold">Accounts & Health</h2>
            </div>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 px-4 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200"
          >
            Back to Dashboard
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-950/40 p-5 text-sm text-slate-300">
          <p className="font-semibold text-slate-200">
            Track client health, renewals, and expansion readiness.
          </p>
          <p className="mt-2 text-slate-500">
            Add your client success data to highlight retention risk, NPS
            trends, and expansion opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}
