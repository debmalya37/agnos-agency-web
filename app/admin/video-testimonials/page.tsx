"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Video } from "lucide-react";

export default function AdminVideoTestimonials() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ clientName: "", companyName: "", shortDescription: "", youtubeUrl: "", order: 0 });

  const fetchVideos = async () => {
    const res = await fetch("/api/admin/video-testimonials");
    const data = await res.json();
    setVideos(data);
    setLoading(false);
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/admin/video-testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ clientName: "", companyName: "", shortDescription: "", youtubeUrl: "", order: 0 });
      fetchVideos();
    } else {
      alert("Failed to add video. Check URL.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/video-testimonials/${id}`, { method: "DELETE" });
    fetchVideos();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Video Testimonials</h1>
        <p className="text-slate-400 text-sm">Manage YouTube Shorts client testimonials.</p>
      </div>

      {/* ADD NEW FORM */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required placeholder="Client Name" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} className="bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2" />
        <input required placeholder="Company Name" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} className="bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2" />
        <input required placeholder="YouTube Short URL" value={form.youtubeUrl} onChange={e => setForm({...form, youtubeUrl: e.target.value})} className="bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2" />
        <input required placeholder="Short Description (Max 120 chars)" maxLength={120} value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} className="bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2" />
        
        <button type="submit" disabled={submitting} className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
          {submitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Add Testimonial
        </button>
      </form>

      {/* LIST */}
      {loading ? <div className="text-center py-10"><Loader2 className="animate-spin mx-auto text-emerald-500" /></div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid) => (
            <div key={vid._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group">
              <div className="aspect-[9/16] bg-black relative">
                {/* Fallback YouTube Thumbnail */}
                <img src={`https://i.ytimg.com/vi/${vid.videoId}/hqdefault.jpg`} alt="thumbnail" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center"><Video size={32} className="text-white/50" /></div>
              </div>
              <div className="p-4 absolute bottom-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="font-bold text-white leading-tight">{vid.clientName}</p>
                <p className="text-xs text-emerald-400 mb-1">{vid.companyName}</p>
                <p className="text-xs text-slate-300 line-clamp-2">{vid.shortDescription}</p>
              </div>
              <button onClick={() => handleDelete(vid._id)} className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}