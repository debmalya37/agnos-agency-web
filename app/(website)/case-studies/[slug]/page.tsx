import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight, MessageSquareQuote } from 'lucide-react';
import CaseStudy, { ICaseStudy } from '@/models/CaseStudy';
import connectDB from '@/lib/db';

// --- TYPES ---
type Props = {
  params: Promise<{ slug: string }>;
};

// --- DATA FETCHING VIA API ---
// --- DIRECT DB FETCHING (No API Call) ---
async function getCaseStudy(slug: string): Promise<ICaseStudy | null> {
  await connectDB(); // Connect directly

  // Query DB directly
  const caseStudy = await CaseStudy.findOne({ slug, status: 'published' }).lean();

  if (!caseStudy) return null;

  // Convert MongoDB object to plain JSON (fixes ID serialization issues)
  return JSON.parse(JSON.stringify(caseStudy));
}

// --- DYNAMIC METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);
  
  if (!caseStudy) return { title: 'Case Study Not Found' };

  return {
    title: `${caseStudy.title} | Unio Case Studies`,
    description: caseStudy.excerpt,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      images: [caseStudy.coverImage],
    },
  };
}

// --- HELPER ---
const formatDate = (dateString?: string | Date) => {
  if (!dateString) return 'Recent';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// --- PAGE COMPONENT ---
export default async function CaseStudyDetailsPage({ params }: Props) {
  // 1. Await params first (Next.js 15 requirement)
  const { slug } = await params;
  
  // 2. Fetch data using the slug
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070B12] text-white font-sans selection:bg-orange-500/30">
      {/* Global ambience */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_-10%,rgba(249,115,22,0.20),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_600px_at_10%_20%,rgba(249,115,22,0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_90%_70%,rgba(249,115,22,0.08),transparent_65%)]" />
      </div>
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 md:pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 via-[#070B12] to-[#070B12] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[480px] bg-orange-600/10 blur-[140px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md mb-6">
            <span className="text-orange-400 text-xs font-medium uppercase tracking-[0.2em]">
              {caseStudy.clientName}
            </span>
            {caseStudy.industry && (
              <>
                <span className="w-1 h-1 rounded-full bg-orange-500" />
                <span className="text-orange-300 text-xs uppercase tracking-[0.2em]">
                  {caseStudy.industry}
                </span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-sm font-medium mb-10">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
              Published {formatDate(caseStudy.publishedAt)}
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
              5 min read
            </span>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-transparent opacity-70 z-10" />
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              width={1400}
              height={800}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
              
            />
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-28 relative z-10">
        
        {/* The Challenge */}
        <section className="relative pl-8 md:pl-12 border-l border-orange-500/25">
          <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.9)]" />
          <p className="text-orange-400 text-sm font-medium uppercase tracking-[0.25em] mb-3">01. The Challenge</p>
          <div 
            className="prose prose-xl prose-invert max-w-none prose-headings:font-medium prose-headings:text-white prose-p:text-gray-300 prose-strong:text-orange-400 prose-a:text-orange-500 hover:prose-a:text-orange-400"
            dangerouslySetInnerHTML={{ __html: caseStudy.challenge }} 
          />
        </section>

        {/* The Solution */}
        <section className="relative pl-8 md:pl-12 border-l border-orange-500/25">
          <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.9)]" />
          <p className="text-orange-400 text-sm font-medium uppercase tracking-[0.25em] mb-3">02. The Solution</p>
          <div 
            className="prose prose-xl prose-invert max-w-none prose-headings:font-medium prose-headings:text-white prose-p:text-gray-300 prose-strong:text-orange-400 prose-a:text-orange-500"
            dangerouslySetInnerHTML={{ __html: caseStudy.solution || caseStudy.content }} 
          />
        </section>

        {/* 3. KEY RESULTS */}
        {caseStudy.results && caseStudy.results.length > 0 && (
          <section className="relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-3">Measurable Impact</h2>
              <p className="text-gray-400">The numbers speak for themselves.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-[#101723]/70 border border-white/5 rounded-3xl p-6 md:p-8 text-center relative group hover:bg-[#131C2E] transition-all flex flex-col items-center justify-center">
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-500/10 group-hover:ring-orange-500/30 transition-all" />
                  
                  {/* UPDATED: break-words, w-full, leading-tight to prevent cropping */}
                  <p className="relative text-2xl md:text-3xl lg:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600 mb-3 w-fit leading-tight pb-1">
                    {result.value}
                  </p>
                  
                  {/* UPDATED: break-words, relaxed leading */}
                  <p className="relative text-sm font-medium text-gray-300 uppercase tracking-[0.2em] w-full break-words leading-relaxed">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. TESTIMONIAL */}
        {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
          <section className="relative my-20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 to-orange-500/5 blur-3xl -z-10 rounded-full" />
            <div className="bg-[#111826] border border-orange-500/20 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
              <MessageSquareQuote className="text-orange-500/20 w-28 h-28 absolute top-[-16px] left-[-16px] rotate-12" />
              
              <blockquote className="relative z-10 max-w-3xl mx-auto">
                <p className="text-2xl md:text-4xl font-medium text-white leading-tight mb-8">
                  "{caseStudy.testimonials[0].quote}"
                </p>
                <footer className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden border-2 border-orange-500 mb-2">
                    {caseStudy.testimonials[0].authorImage ? (
                        <img src={caseStudy.testimonials[0].authorImage} width={48} height={48} alt="Author" className="object-cover w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-orange-600 text-white font-medium">
                            {caseStudy.testimonials[0].authorName.charAt(0)}
                        </div>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">{caseStudy.testimonials[0].authorName}</p>
                    <p className="text-sm text-orange-400 font-medium">
                      {caseStudy.testimonials[0].authorRole}, {caseStudy.clientName}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          </section>
        )}

        {/* Deep Dive */}
        {caseStudy.content && caseStudy.content !== caseStudy.solution && (
             <section className="relative pl-8 md:pl-12 border-l border-gray-800">
             <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.2em] mb-3">Deep Dive</p>
             <div 
               className="prose prose-xl prose-invert max-w-none prose-p:text-gray-400"
               dangerouslySetInnerHTML={{ __html: caseStudy.content }} 
             />
           </section>
        )}

      </div>

      {/* 5. CTA SECTION */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_20%_10%,rgba(255,255,255,0.15),transparent_60%)] z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-multiply z-0" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-medium text-white mb-8 tracking-tight">
            Ready to scale?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop leaving revenue on the table. Let's build your growth engine today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact" 
              className="group bg-black text-white px-10 py-5 rounded-full font-medium text-lg shadow-2xl hover:scale-[1.03] transition-transform flex items-center gap-3 border border-white/10"
            >
              Book Strategy Call
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/case-studies" 
              className="text-white font-medium text-lg border-b border-white/30 pb-1 hover:text-white/80 hover:border-white transition-all"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className="bg-[#050912] py-12 px-6 border-t border-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-medium text-white">unio.</div> 
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Unio. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}