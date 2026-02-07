import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export default function AdminInboxPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-200">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Communications
              </p>
              <h2 className="text-2xl font-semibold">Unified Inbox</h2>
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
            Connect your client communications for a 360° view.
          </p>
          <p className="mt-2 text-slate-500">
            Bring in shared inboxes, Slack alerts, and escalation rules to keep
            delivery teams in sync.
          </p>
        </div>
      </div>
    </div>
  );
}
