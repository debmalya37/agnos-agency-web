"use client";

import React from "react";
import Image from "next/image";

const BLOG_POSTS = [
  {
    type: "featured",
    category: "BRANDING",
    title: "Why storytelling shapes brand success",
    date: "Dec 20, 2025",
    author: "Mason Clark",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop", // Orange architectural abstract
  },
  {
    type: "standard",
    category: "DESIGN",
    title: "The future of scalable design systems in 2025",
    date: "Jan 2, 2026",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", // Minimal desk
  },
  {
    type: "standard",
    category: "DEVELOPMENT",
    title: "Built for High-Performance in Framer",
    date: "Dec 6, 2025",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop", // Laptop/Code
  },
];

export default function LatestBlog() {
  return (
    <section className="bg-[#0B1220] py-24 px-4 md:px-10 font-poppins">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-medium text-[#F3F3F3] text-center mb-12 tracking-tight">
          Latest blog
        </h2>

        {/* Blog Container (The Beige/Gray Wrapper) */}
        <div className="bg-[#EAEAEA] rounded-[2.5rem] p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* --- Featured Post (Left Column) --- */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[500px] relative overflow-hidden group">
            
            <div className="flex flex-col md:flex-row h-full gap-8 relative z-10">
              {/* Content Side */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                    {BLOG_POSTS[0].category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-medium text-[#0B1220] leading-[1.1] mb-4 group-hover:text-[#FF6B2C] transition-colors cursor-pointer">
                    {BLOG_POSTS[0].title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium mt-2">
                    {BLOG_POSTS[0].date}
                  </p>
                </div>

                {/* Author Footer */}
                <div className="flex items-center gap-3 mt-8 md:mt-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                    <img 
                      src={BLOG_POSTS[0].avatar} 
                      alt={BLOG_POSTS[0].author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-[#0B1220]">
                    {BLOG_POSTS[0].author}
                  </span>
                </div>
              </div>

              {/* Image Side (Desktop) */}
              <div className="w-full md:w-[280px] h-[300px] md:h-auto shrink-0 relative rounded-2xl overflow-hidden self-stretch">
                <img 
                  src={BLOG_POSTS[0].image} 
                  alt="Featured post" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* --- Stacked Posts (Right Column) --- */}
          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            
            {/* Top Right Card */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 flex justify-between items-start gap-4 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-3 block">
                    {BLOG_POSTS[1].category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-[#0B1220] leading-tight mb-4 group-hover:text-[#FF6B2C] transition-colors">
                    {BLOG_POSTS[1].title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 font-medium">
                  {BLOG_POSTS[1].date}
                </p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                <img 
                  src={BLOG_POSTS[1].image} 
                  alt="Post thumbnail" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Bottom Right Card */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 flex justify-between items-start gap-4 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-3 block">
                    {BLOG_POSTS[2].category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium text-[#0B1220] leading-tight mb-4 group-hover:text-[#FF6B2C] transition-colors">
                    {BLOG_POSTS[2].title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 font-medium">
                  {BLOG_POSTS[2].date}
                </p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                 <img 
                  src={BLOG_POSTS[2].image} 
                  alt="Post thumbnail" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}