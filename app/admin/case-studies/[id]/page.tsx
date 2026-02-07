"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Sparkles, Wand2, UploadCloud, X, Link as LinkIcon, Image as ImageIcon, Trash2, Braces } from "lucide-react";
import Link from "next/link";
// Optimized Image Component
import { CldImage } from "next-cloudinary";
import CaseStudyEditor from "@/components/case-study/CaseStudyEditor";
import { ResultsEditor } from "@/components/case-study/ResultsEditor";
import { TestimonialsEditor } from "@/components/case-study/TestimonialsEditor";
import { generateCaseStudyAI } from "@/lib/actions/generateWithAI";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditCaseStudy() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [showSchema, setShowSchema] = useState(false); // [NEW] Toggle Schema

  const [form, setForm] = useState<any>({
    title: "",
    clientName: "",
    industry: "",
    websiteUrl: "",
    coverImage: "",
    excerpt: "",
    challenge: "",
    solution: "", // [NEW] Solution Field
    content: "",
    seoTitle: "",
    seoDescription: "",
    tags: [],
    schemaMarkup: "", // [NEW] Schema Field
    results: [],
    testimonials: [],
    status: "draft",
  });

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/case-studies?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const rawData = await res.json();
        const data = Array.isArray(rawData) ? rawData[0] : rawData;

        if (data) {
          setForm({
            ...form, 
            ...data, 
            // Ensure fields are defined to prevent uncontrolled input errors
            solution: data.solution || "",
            schemaMarkup: data.schemaMarkup || "",
            results: data.results || [],
            testimonials: data.testimonials || [],
            tags: data.keywords || [], // Map DB 'keywords' to local 'tags'
          });
          
          // Switch to URL mode if it's an external link
          if (data.coverImage && data.coverImage.startsWith('http') && !data.coverImage.includes("cloudinary")) {
             setImageInputMode("url");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Error loading case study");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- IMAGE UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev: any) => ({ ...prev, coverImage: url }));
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // --- AI HANDLERS ---
  const handleGenerateTitles = async () => {
    if (!form.title) return alert("Please type a topic first!");
    setIsGenerating(true);
    try {
      const titles = await generateCaseStudyAI(form.title, "titles");
      if (titles) {
        setTitleSuggestions(titles);
        setShowSuggestions(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateFullDraft = async () => {
    if (!confirm("This will overwrite existing content. Continue?")) return;
    setIsGenerating(true);
    try {
      const data = await generateCaseStudyAI(form.title, "full_draft");
      if (data) {
        setForm((prev: any) => ({
          ...prev,
          clientName: data.client,
          industry: data.industry,
          excerpt: data.excerpt,
          challenge: data.excerpt, // You might map this differently if AI returns separate challenge
          solution: data.solution || "We implemented a comprehensive strategy...",
          content: data.content,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          tags: data.tags,
          schemaMarkup: typeof data.schemaMarkup === 'object' ? JSON.stringify(data.schemaMarkup) : data.schemaMarkup,
          results: data.results || [],
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // [NEW] Handler for generating specifically the deep dive content
  const handleGenerateContentOnly = async () => {
    if (!form.title) return alert("Please set a title first so AI knows the context.");
    
    setIsGenerating(true);
    try {
        const data = await generateCaseStudyAI(form.title, "full_draft");
        if (data && data.content) {
            setForm((prev: any) => ({
                ...prev,
                content: prev.content ? prev.content + "<br/><br/>" + data.content : data.content
            }));
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  const submit = async () => {
    // Validation
    if (!form.title || !form.clientName || !form.challenge || !form.solution) {
      alert("Please fill in required fields: Title, Client, Challenge, and Solution.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/case-studies?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update");

      router.push("/admin/case-studies");
    } catch (e: any) {
      console.error(e);
      alert(`Error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-900">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/case-studies"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Case Study</h1>
            <p className="text-sm text-gray-500">Updating project details</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleGenerateFullDraft}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 px-4 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
            <span className="hidden sm:inline">AI Regenerate All</span>
          </button>

          <div className="h-10 w-px bg-gray-200 mx-2" />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={submit}
            disabled={saving}
            className="flex items-center gap-2 bg-[#0B1220] hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 shadow-lg"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : "Update Project"}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Basic Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible relative z-30">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Project Essentials</h3>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Title with AI */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    placeholder="e.g. Fintech App Growth"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={handleGenerateTitles}
                    disabled={isGenerating || !form.title}
                    className="bg-purple-50 text-purple-600 border border-purple-200 p-2.5 rounded-lg hover:bg-purple-100 transition-colors"
                    title="Get AI Suggestions"
                  >
                    <Sparkles size={20} />
                  </button>
                </div>
                {/* AI Dropdown */}
                {showSuggestions && titleSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="bg-purple-50 px-4 py-2 border-b border-purple-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-purple-700 uppercase">Suggestions</span>
                      <button onClick={() => setShowSuggestions(false)}><X size={14}/></button>
                    </div>
                    {titleSuggestions.map((s, i) => (
                      <button key={i} onClick={() => { setForm({ ...form, title: s }); setShowSuggestions(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Client Name <span className="text-red-500">*</span></label>
                  <input
                    placeholder="e.g. Stripe"
                    value={form.clientName} 
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Industry</label>
                  <input
                    placeholder="e.g. Finance"
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* CHALLENGE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">The Challenge <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  placeholder="Describe the problem the client was facing..."
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* SOLUTION [NEW] */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">The Solution <span className="text-red-500">*</span></label>
                <textarea
                  rows={3}
                  placeholder="Briefly explain the strategy or solution implemented..."
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  placeholder="Summary for card previews..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Editor Card with AI Button */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Deep Dive Content</h3>
              {/* [NEW] AI Content Button */}
              <button 
                onClick={handleGenerateContentOnly}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors border border-purple-100"
              >
                 {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                 Write with AI
              </button>
            </div>
            <CaseStudyEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
          </div>

        </div>

        {/* Right Column: Meta & Extras */}
        <div className="space-y-8">
          
          {/* 3. Cover Image Upload (OPTIMIZED) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Cover Image <span className="text-red-500">*</span></h3>
              <div className="flex bg-gray-200 rounded-lg p-1 gap-1">
                <button 
                  onClick={() => setImageInputMode("upload")}
                  className={`p-1.5 rounded-md transition-all ${imageInputMode === "upload" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Upload File"
                >
                  <UploadCloud size={16} />
                </button>
                <button 
                  onClick={() => setImageInputMode("url")}
                  className={`p-1.5 rounded-md transition-all ${imageInputMode === "url" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  title="Image URL"
                >
                  <LinkIcon size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {form.coverImage ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  
                  {/* OPTIMIZATION: Use CldImage if it's a Cloudinary URL */}
                  {form.coverImage.includes("cloudinary.com") ? (
                    <CldImage
                      src={form.coverImage}
                      alt="Cover"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw" 
                      format="auto" 
                      quality="auto"
                    />
                  ) : (
                    // Fallback
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  )}

                  <button 
                    onClick={() => setForm({...form, coverImage: ""})}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:text-red-700 shadow-sm transition-colors z-10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <>
                  {imageInputMode === "upload" ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative group">
                      <label className="cursor-pointer flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <UploadCloud size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {uploading ? "Uploading..." : "Click to upload image"}
                        </span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white">
                        <ImageIcon size={18} className="text-gray-400" />
                        <input 
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
                          onBlur={(e) => setForm({ ...form, coverImage: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-gray-500 pl-1">Paste a direct link to an image.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 4. Results Editor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Key Results</h3>
            </div>
            <div className="p-6">
              <ResultsEditor value={form.results} onChange={(v: any) => setForm({ ...form, results: v })} />
            </div>
          </div>

          {/* 5. SEO & Metadata */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">SEO Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Title</label>
                <input
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-gray-200 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={form.seoDescription}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-gray-200 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* [NEW] Schema Markup Field */}
              <div>
                <button 
                  type="button" 
                  onClick={() => setShowSchema(!showSchema)} 
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase hover:text-gray-800 mb-2 transition-colors"
                >
                    <Braces size={14} /> 
                    {showSchema ? 'Hide' : 'Show'} Schema Markup
                </button>
                {showSchema && (
                    <div className="animate-in fade-in slide-in-from-top-1">
                        <textarea 
                            rows={5} 
                            value={form.schemaMarkup} 
                            onChange={(e) => setForm({ ...form, schemaMarkup: e.target.value })} 
                            placeholder='{"@context": "https://schema.org", "@type": "Article" ...}'
                            className="w-full px-3 py-2 text-xs font-mono rounded border border-gray-200 focus:border-blue-500 outline-none resize-none bg-slate-50 text-slate-600" 
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Paste valid JSON-LD structure here.</p>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* 6. Testimonials */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Client Testimonials</h3>
            </div>
            <div className="p-6">
              <TestimonialsEditor value={form.testimonials} onChange={(v: any) => setForm({ ...form, testimonials: v })} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}