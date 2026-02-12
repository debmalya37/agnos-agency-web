import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import connectDB from '@/lib/db';
import CaseStudy, { ICaseStudy } from '@/models/CaseStudy';

// --- FIX: FORCE DYNAMIC RENDERING ---
// This ensures the page fetches fresh data on every visit
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Case Studies | Aitek Media Agency',
  description: 'Explore how we have helped ambitious brands scale through strategic design and development.',
};

// --- DATA FETCHING ---
async function getCaseStudies() {
  await connectDB();
  
  // Fetch only published case studies, sorted by newest first
  const caseStudies = await CaseStudy.find({ status: 'published' })
    .sort({ publishedAt: -1, createdAt: -1 })
    .select('title clientName industry coverImage excerpt slug results')
    .lean();

  return JSON.parse(JSON.stringify(caseStudies)) as ICaseStudy[];
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-[#070B12] text-white font-sans selection:bg-orange-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient Background */}
        <div className="pointer-events-none fixed inset-0">
           <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-orange-600/10 blur-[140px] rounded-full opacity-60" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[140px] rounded-full opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">Our Work</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Results that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">speak for themselves.</span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Dive into our collection of success stories. See how we've transformed challenges into revenue-generating digital assets for our clients.
          </p>
        </div>
      </section>

      {/* 2. CASE STUDIES GRID */}
      <section className="px-6 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {caseStudies.map((study, index) => (
                <Link 
                  href={`/case-studies/${study.slug}`} 
                  key={study._id.toString()}
                  className="group relative flex flex-col gap-6"
                >
                  {/* Image Card */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#141820] shadow-2xl transition-all duration-500 group-hover:shadow-orange-500/10 group-hover:border-white/20">
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Loading placeholder feeling */}
                    
                    <img
                      src={study.coverImage}
                      alt={study.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B12]/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                    
                    {/* Floating Result Badge (if results exist) */}
                    {study.results && study.results.length > 0 && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg">
                        {study.results[0].value} {study.results[0].label}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3 px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange-500">
                        <span>{study.clientName}</span>
                        {study.industry && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-gray-600" />
                            <span className="text-gray-500">{study.industry}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white group-hover:text-black">
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-orange-500 transition-colors">
                      {study.title}
                    </h2>
                    
                    <p className="text-gray-400 line-clamp-2 leading-relaxed">
                      {study.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
              <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <LayoutGrid className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Case Studies Yet</h3>
              <p className="text-gray-400 max-w-md">
                We are currently curating our latest success stories. Check back soon or contact us to see our portfolio.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 3. CTA BOTTOM */}
      <section className="py-24 border-t border-white/5 bg-[#05080F]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to write your success story?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Join the forward-thinking companies that trust Aitek to deliver exceptional digital experiences.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
          >
            Start a Project <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
}