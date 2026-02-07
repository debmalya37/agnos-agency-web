'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import BlogEditor from '@/components/BlogEditor';
import { Save, X, ImagePlus, ChevronLeft, Loader2, Search, Settings, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateBlogAI } from './actions'; // Import the new action

interface BlogFormInputs {
  title: string;
  author: string;
  createdAt: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm<BlogFormInputs>({
    defaultValues: {
      author: 'Aitek Agency',
      createdAt: new Date().toISOString().split('T')[0],
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    }
  });
  
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // AI States
  const [aiLoading, setAiLoading] = useState<{ title: boolean; content: boolean; seo: boolean }>({
    title: false, content: false, seo: false
  });
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);

  const coverImageUrl = watch('coverImage');

  // --- AI HANDLERS ---

  const handleGenerateTitles = async () => {
    const currentTitle = getValues('title');
    if (!currentTitle) { setError('Please enter a topic in the title field first.'); return; }
    
    setAiLoading(prev => ({ ...prev, title: true }));
    setError('');
    
    const res = await generateBlogAI('title', currentTitle);
    if (res.error) setError(res.error);
    else if (res.data) {
        try {
            setGeneratedTitles(JSON.parse(res.data));
        } catch (e) { setError('Failed to parse AI suggestions'); }
    }
    setAiLoading(prev => ({ ...prev, title: false }));
  };

  const handleGenerateOutline = async () => {
    const currentTitle = getValues('title');
    if (!currentTitle) { setError('Please enter a title first.'); return; }

    setAiLoading(prev => ({ ...prev, content: true }));
    
    const res = await generateBlogAI('outline', currentTitle);
    if (res.error) setError(res.error);
    else if (res.data) {
        // Append outline to existing content
        setContent(prev => prev + res.data);
    }
    setAiLoading(prev => ({ ...prev, content: false }));
  };

  const handleGenerateSEO = async () => {
    if (!content || content.length < 50) { setError('Please write some content first.'); return; }

    setAiLoading(prev => ({ ...prev, seo: true }));

    const res = await generateBlogAI('seo', content);
    if (res.error) setError(res.error);
    else if (res.data) {
        try {
            const seoData = JSON.parse(res.data);
            setValue('metaTitle', seoData.metaTitle);
            setValue('metaDescription', seoData.metaDescription);
            setValue('keywords', seoData.keywords);
        } catch (e) { setError('Failed to parse SEO data'); }
    }
    setAiLoading(prev => ({ ...prev, seo: false }));
  };

  // --- SUBMIT HANDLER ---

  const onSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
    setIsSubmitting(true);
    setError('');

    if (!content || content === '<p><br></p>') {
        setError('Blog content cannot be empty.');
        setIsSubmitting(false);
        return;
    }

    const finalData = {
        ...data,
        content,
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || content.replace(/<[^>]+>/g, '').substring(0, 160)
    };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      router.push('/admin/blogs'); 
      router.refresh(); 
      
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-32 overflow-y-auto">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-medium text-slate-900 leading-tight">Create Blog</h1>
            <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/admin/blogs" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2">
                Cancel
            </Link>
            <button 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-black text-white p-2 sm:px-6 sm:py-2.5 rounded-full sm:rounded-xl shadow-lg sm:shadow-sm flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
                 {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                 <span className="hidden sm:inline font-medium">Publish</span>
            </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 text-red-700 animate-in fade-in">
                <X size={18} />
                <p className="text-sm font-medium">{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- LEFT COLUMN --- */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* TITLE SECTION */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-900">Blog Title</label>
                        <div className="relative group">
                            <input 
                                {...register('title', { required: "Title is required" })}
                                type="text" 
                                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-lg font-medium text-slate-950 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm" 
                                placeholder="Enter topic..."
                            />
                            {/* AI Magic Button inside Input */}
                            <button
                                type="button"
                                onClick={handleGenerateTitles}
                                disabled={aiLoading.title}
                                className="absolute right-2 top-2 p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors tooltip"
                                title="Generate Ideas"
                            >
                                {aiLoading.title ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                            </button>
                        </div>

                        {/* AI Suggestions Dropdown */}
                        {generatedTitles.length > 0 && (
                            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2">
                                <p className="text-xs font-medium text-indigo-800 uppercase tracking-wide">AI Suggestions</p>
                                <div className="space-y-1">
                                    {generatedTitles.map((t, i) => (
                                        <button 
                                            key={i} 
                                            type="button" 
                                            onClick={() => { setValue('title', t); setGeneratedTitles([]); }}
                                            className="block w-full text-left px-3 py-2 text-sm text-indigo-700 hover:bg-white hover:shadow-sm rounded-lg transition"
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                    </div>
                    
                    {/* CONTENT SECTION */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-900">Content</label>
                            
                            {/* AI Outline Button */}
                            <button
                                type="button"
                                onClick={handleGenerateOutline}
                                disabled={aiLoading.content}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full shadow-sm transition-all hover:shadow-md disabled:opacity-70"
                            >
                                {aiLoading.content ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                                Write Outline
                            </button>
                        </div>
                        
                        <div className="prose-editor-wrapper min-h-[400px]">
                            <BlogEditor value={content} onChange={setContent} />
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN (Sidebar) --- */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Publishing Card (Unchanged) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-5">
                 <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Settings size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">Publishing</h3>
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Author</label>
                    <input {...register('author')} readOnly className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-slate-500 text-sm font-medium cursor-not-allowed" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Publish Date</label>
                    <input {...register('createdAt')} type="date" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>

               {/* Image Card (Unchanged) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
                 <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">Featured Image</h3>
                 <CldUploadWidget 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result: any) => setValue('coverImage', result.info.secure_url)}
                 >
                    {({ open }) => (
                        <div onClick={() => open()} className={`group relative border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer min-h-[160px] flex flex-col items-center justify-center ${coverImageUrl ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'}`}>
                            {coverImageUrl ? (
                                <div className="relative w-full h-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={coverImageUrl} alt="Cover" className="w-full h-40 object-cover rounded-lg shadow-sm" />
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setValue('coverImage', ''); }} className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-red-50"><X size={14} /></button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto transition group-hover:scale-110"><ImagePlus size={20} /></div>
                                    <span className="block text-xs font-medium text-blue-600">Upload Cover</span>
                                </div>
                            )}
                        </div>
                    )}
                 </CldUploadWidget>
              </div>

              {/* SEO Card (AI ENHANCED) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-5">
                 <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <Search size={18} className="text-gray-400" />
                        <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">SEO</h3>
                    </div>
                    {/* AI SEO Button */}
                    <button
                        type="button"
                        onClick={handleGenerateSEO}
                        disabled={aiLoading.seo}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 disabled:opacity-50"
                    >
                        {aiLoading.seo ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                        Auto-Fill
                    </button>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Meta Title</label>
                    <input {...register('metaTitle')} type="text" placeholder="Page title..." className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>

                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
                    <textarea {...register('metaDescription')} rows={3} placeholder="Brief summary..." className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                 </div>

                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Keywords</label>
                    <input {...register('keywords')} type="text" placeholder="react, seo, design" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>
              </div>

            </div>
          </div>
        </form>
      </main>
    </div>
  );
}