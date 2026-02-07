"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  Loader2, 
  Mail, 
  MessageSquare, 
  Search, 
  Trash2, 
  XCircle 
} from "lucide-react";
import { format } from "date-fns"; // Optional: run 'npm install date-fns' for easier formatting

interface Lead {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // --- FETCH DATA ---
  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to load leads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // --- ACTIONS ---
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    // Optimistic UI Update
    setLeads((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status: newStatus as any } : l))
    );

    try {
      await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (error) {
      console.error("Update failed", error);
      fetchLeads(); // Revert on fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    setLeads((prev) => prev.filter((l) => l._id !== id));

    try {
      await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Delete failed", error);
      fetchLeads();
    }
  };

  // --- FILTERING ---
  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads & Inquiries</h1>
          <p className="text-slate-400 text-sm">Manage incoming messages and potential clients.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500/50 w-full sm:w-64"
          />
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-emerald-500" size={32} />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-slate-200 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Subject & Message</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-800/50 transition-colors">
                      
                      {/* Client Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-bold border border-slate-700">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-medium">{lead.name}</p>
                            <a href={`mailto:${lead.email}`} className="text-xs text-slate-500 hover:text-emerald-400 flex items-center gap-1 mt-0.5">
                              {lead.email}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-200 font-medium truncate">{lead.subject}</p>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
                          className={`
                            px-3 py-1 rounded-full text-xs font-semibold border appearance-none cursor-pointer outline-none transition-all
                            ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                              lead.status === 'contacted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              'bg-slate-700/30 text-slate-400 border-slate-700'}
                          `}
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a 
                            href={`mailto:${lead.email}?subject=Re: ${lead.subject}`} 
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                            title="Reply via Email"
                          >
                            <Mail size={18} />
                          </a>
                          <button 
                            onClick={() => handleDelete(lead._id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-3">
                        <MessageSquare size={32} className="opacity-20" />
                        <p>No leads found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}