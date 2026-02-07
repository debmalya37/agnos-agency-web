'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import BlogEditor from '@/components/BlogEditor';
import { Save, X, ImagePlus, ChevronLeft, Loader2, Search, Settings } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogFormInputs {
  title: string;
  author: string;
  createdAt: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const blogId = params.id;

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<BlogFormInputs>({
    defaultValues: {
      author: 'Thinqit Agency',
      createdAt: new Date().toISOString().split('T')[0],
    }
  });
  
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // For initial data fetch
  const [error, setError] = useState<string>('');

  const coverImageUrl = watch('coverImage');

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs`); // Ideally fetch single by ID, but filtering list works for now if you don't have a GET /id route yet.
        // BETTER APPROACH: Let's assume you might add GET /api/blogs/[id] later, 
        // but for now let's filter the client side list or use the ID if your GET API supports filtering.
        
        // Since we didn't explicitly create a GET /api/blogs/[id] yet, 
        // we can cheat slightly and fetch all, or update the API. 
        // However, standard practice is to use the single ID endpoint.
        // Let's assume standard behavior:
        const response = await fetch(`/api/blogs/${blogId}`, { method: 'GET' }); 
        
        // Note: If you haven't made a GET method in [id]/route.ts, this will fail.
        // If that's the case, use the list fetch below:
        // const res = await fetch('/api/blogs');
        // const blogs = await res.json();
        // const data = blogs.find((b: any) => b._id === blogId);

        // Assuming you add GET to [id]/route.ts (recommended):
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();

        // Populate Form
        reset({
            title: data.title,
            author: data.author,
            createdAt: data.createdAt ? new Date(data.createdAt).toISOString().split('T')[0] : '',
            coverImage: data.coverImage,
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',
            // Convert Array ["seo", "react"] -> String "seo, react"
            keywords: data.keywords ? data.keywords.join(', ') : '',
        });
        
        setContent(data.content);
        setValue('coverImage', data.coverImage);

      } catch (err) {
        console.error(err);
        setError('Could not load blog data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, reset, setValue]);


  // 2. Handle Update (PUT)
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
        // Meta fallbacks
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || content.replace(/<[^>]+>/g, '').substring(0, 160)
    };

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT', // Changed to PUT
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

  if (isLoading) {
      return (
          <div className="flex h-screen items-center justify-center bg-slate-50">
              <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
      );
  }

  return (
    <div className="w-full bg-slate-50 pb-32">
      
      {/* Sticky Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-medium text-slate-900 leading-tight">Edit Blog</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Update your article content</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/admin/blogs" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2">
                Cancel
            </Link>
            <button 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:px-6 sm:py-2.5 rounded-full sm:rounded-xl shadow-lg sm:shadow-sm flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                 {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                 <span className="hidden sm:inline font-medium">Update Changes</span>
            </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                <X size={18} />
                <p className="text-sm font-medium">{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- LEFT COLUMN (Main Content) --- */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">
                            Blog Title
                        </label>
                        <input 
                            {...register('title', { required: "Title is required" })}
                            type="text" 
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-lg font-medium text-slate-950 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm" 
                            placeholder="Enter your engaging title here..."
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-500 font-medium">{errors.title.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">Content</label>
                        <div className="prose-editor-wrapper min-h-[400px]">
                            <BlogEditor value={content} onChange={setContent} />
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN (Sidebar Settings) --- */}
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Card 1: Meta & Publishing */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-5">
                 <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Settings size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">Publishing</h3>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Author</label>
                    <input 
                      {...register('author')} 
                      readOnly 
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-slate-500 text-sm font-medium cursor-not-allowed" 
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Publish Date</label>
                    <input 
                      {...register('createdAt')} 
                      type="date" 
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition" 
                    />
                 </div>
              </div>

              {/* Card 2: Featured Image */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
                 <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">Featured Image</h3>
                 
                 <CldUploadWidget 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(result: any) => setValue('coverImage', result.info.secure_url)}
                 >
                    {({ open }) => (
                        <div 
                          onClick={() => open()} 
                          className={`
                            group relative border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer min-h-[160px] flex flex-col items-center justify-center
                            ${coverImageUrl ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'}
                          `}
                        >
                            {coverImageUrl ? (
                                <div className="relative w-full h-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={coverImageUrl} alt="Cover" className="w-full h-40 object-cover rounded-lg shadow-sm" />
                                    <button 
                                      type="button" 
                                      onClick={(e) => { e.stopPropagation(); setValue('coverImage', ''); }} 
                                      className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-red-50 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto transition group-hover:scale-110">
                                        <ImagePlus size={20} />
                                    </div>
                                    <span className="block text-xs font-medium text-blue-600">Change Cover</span>
                                </div>
                            )}
                        </div>
                    )}
                 </CldUploadWidget>
              </div>

              {/* Card 3: SEO */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-5">
                 <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Search size={18} className="text-gray-400" />
                    <h3 className="text-sm font-medium text-slate-900 uppercase tracking-wide">SEO Metadata</h3>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Meta Title</label>
                    <input 
                        {...register('metaTitle')} 
                        type="text" 
                        placeholder="Page title for Google"
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400" 
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Description</label>
                    <textarea 
                        {...register('metaDescription')} 
                        rows={3}
                        placeholder="Brief summary..."
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400 resize-none" 
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Keywords</label>
                    <input 
                        {...register('keywords')} 
                        type="text" 
                        placeholder="react, seo, design"
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400" 
                    />
                 </div>
              </div>

            </div>
          </div>
        </form>
      </main>
    </div>
  );
}