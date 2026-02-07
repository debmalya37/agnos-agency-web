import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image for optimization
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import { ChevronLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

// --- 1. Types & Helpers ---

interface PageProps {
  params: { slug: string };
}

// Calculate reading time (approx 200 words per minute)
const calculateReadingTime = (content: string) => {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

// Helper to format dates beautifully
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

async function getBlog(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  };
}

// --- 2. SEO Metadata Generator ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  
  const { slug } = params; 
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      type: 'article',
      publishedTime: blog.createdAt,
      authors: [blog.author],
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

// --- 3. Main Component ---

export default async function SingleBlogPage({ params }: PageProps) {
  // Fix for Next.js 14.2: params are synchronous
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const readingTime = calculateReadingTime(blog.content);

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- Sticky Navigation Bar --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link 
            href="/blogs" 
            className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition group"
          >
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="text-sm font-semibold text-gray-900 truncate max-w-[200px] hidden sm:block">
            {blog.title}
          </div>
          <div className="flex gap-4">
             {/* Placeholder for Share Actions */}
             <button className="text-gray-400 hover:text-blue-500 transition"><Twitter size={18} /></button>
             <button className="text-gray-400 hover:text-blue-700 transition"><Linkedin size={18} /></button>
          </div>
        </div>
      </nav>

      <article className="py-10 pb-24">
        
        {/* --- Header Section --- */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left">
          
          {/* Tags (if you have them, otherwise hidden) */}
          {blog.keywords && blog.keywords.length > 0 && (
             <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
               {blog.keywords.map((tag: string) => (
                 <span key={tag} className="px-3 py-1 text-xs font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                   {tag}
                 </span>
               ))}
             </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                {blog.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{blog.author}</p>
                <p className="text-xs">Author</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(blog.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readingTime}</span>
            </div>
          </div>
        </header>

        {/* --- Cover Image --- */}
        {blog.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
              {/* Use standard img tag if domain not in next.config.js, otherwise use <Image fill ... /> */}
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-in-out"
              />
            </div>
          </div>
        )}

        {/* --- Main Content --- */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="
              prose prose-lg prose-slate 
              max-w-none
              prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-gray-900
              prose-p:leading-loose prose-p:text-gray-700
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
              prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              marker:text-blue-500
            "
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          
          {/* --- Footer / Tags --- */}
          <div className="mt-16 pt-8 border-t border-gray-100">
             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-500 text-sm">
                   Share this article
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium">
                     <Twitter size={18} /> Tweet
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium">
                     <Share2 size={18} /> Copy Link
                  </button>
                </div>
             </div>
          </div>

        </div>
      </article>
    </div>
  );
}