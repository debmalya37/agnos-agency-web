"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Working with this team was effortless that they understood our brand vision & turned it into a digital experience that truly represents who we are.",
    name: "Olivia Carter",
    role: "Brand Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "They translated our ideas into a clean, modern digital presence that feels exactly right for our brand. The attention to detail was impressive.",
    name: "Ethan Miller",
    role: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "The team instantly grasped our strategic goals and delivered a seamless, high-performance site that exceeded every expectation.",
    name: "Sophia Reyes",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 4,
    quote: "A true partnership. They didn't just build a website; they built a growth engine that has already increased our conversion rates by 40%.",
    name: "David Chen",
    role: "Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#0B1220] py-24 px-4 overflow-hidden font-poppins">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-4">
            <span>{">"}</span> TESTIMONIALS <span>{"<"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#F3F3F3] tracking-tight">
            What clients say
          </h2>
        </div>

        {/* Carousel Track */}
        {/* We use a ref-based scroll container here for the button logic, 
            but keep overflow-x-auto for native swipe on mobile */}
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10 px-4 md:px-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -5 }}
              className="min-w-[90vw] md:min-w-[650px] bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm snap-center flex flex-col justify-between"
            >
              {/* Quote */}
              <p className="text-xl md:text-2xl font-medium text-[#0B1220] leading-relaxed mb-12">
                {t.quote}
              </p>

              {/* Footer: User Info & Ratings */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span className="text-sm font-bold text-[#0B1220]">{t.name}</span>
                    <span className="hidden md:block text-gray-300">—</span>
                    <span className="text-sm font-medium text-gray-400">{t.role}</span>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FF6B2C] text-[#FF6B2C]" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-8 relative">
          {/* The subtle background line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-px bg-gray-200 -z-10" />
          
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-[#0B1220] shadow-sm hover:scale-110 transition-transform hover:shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-[#0B1220] shadow-sm hover:scale-110 transition-transform hover:shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}