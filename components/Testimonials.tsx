"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The lead generation campaign for selling of mangoes during summer season brought us positive ROI on website and mobile application.",
    name: "Kokanraj",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    quote:
      "With the help of social media marketing strategy from Aitek Media we were able to get orders from potential customers online.",
    name: "Zero2 Commune",
    role: "Director",
    image: "https://i.pravatar.cc/150?img=22",
  },
  {
    id: 3,
    quote:
      "The website project work was completed within the given timeline and as per our custom requirements.",
    name: "Gaucr Consulting",
    role: "Co-Founder",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 4,
    quote:
      "Due to the work on Google Business Profile there was an increase in visitors and call enquiries to our JEE Coaching Classes centres.",
    name: "Takalkar Classes",
    role: "Business Head",
    image: "https://i.pravatar.cc/150?img=42",
  },
  {
    id: 5,
    quote:
      "We were able to drive site visits and project bookings for a project launch within 45 days of working with the marketing team of Aitek Media.",
    name: "SiddhiVinayak Properties",
    role: "Chief Consultant",
    image: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 6,
    quote:
      "The brand logo and branding work was clearly reflected into our long term vision and eco-friendly food product lines for all the markets.",
    name: "Satav Patil Industries",
    role: "Managing Director",
    image: "https://i.pravatar.cc/150?img=62",
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
    <section className="bg-[#000000] py-16 px-4 overflow-hidden font-poppins">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium text-gray-400 tracking-[0.3em] uppercase mb-4">
            <span>{">"}</span> TESTIMONIALS <span>{"<"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-[#F3F3F3] tracking-tight">
            What clients say
          </h2>
        </div>

        {/* Carousel Track */}
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
              <p className="text-xl md:text-2xl font-medium text-[#0B1220] leading-relaxed mb-12">
                “{t.quote}”
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span className="text-sm font-medium text-[#0B1220]">{t.name}</span>
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
