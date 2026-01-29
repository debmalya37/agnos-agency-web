"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- DATA ---------------- */
const PROJECTS = [
  {
    id: 1,
    title: "Haven Living",
    industry: "Home & Lifestyle",
    scope: "Brand Direction + Visual System",
    description: "Created a warm, lifestyle-driven digital presence that highlights interior quality, storytelling, and modern aesthetics.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
  },
  {
    id: 2,
    title: "Orion Fitness",
    industry: "Health & Wellness",
    scope: "Brand Identity + Mobile App UI",
    description: "Designed a motivating mobile experience with clearer progress tracking, smoother usability, and stronger daily engagement.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800",
  },
  {
    id: 3,
    title: "Apex Finance",
    industry: "FinTech",
    scope: "Web Design + Dashboard",
    description: "Reimagined the user dashboard for a leading fintech platform, focusing on clarity, speed, and trust.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
  },
  {
    id: 4,
    title: "Lumina Art",
    industry: "Culture & Arts",
    scope: "Identity + Exhibition Site",
    description: "A digital gallery experience that brings physical art into the virtual world with immersive interactions.",
    image: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=800",
  }
];

/* ---------------- FEATURED PROJECT CARD ---------------- */
function FeaturedCard({ project }: { project: any }) {
  return (
    <motion.div 
      layoutId={`card-${project.id}`} // Magic layout transition
      className="bg-white rounded-[28px] shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 h-full"
    >
      <div className="flex-1 flex flex-col min-h-[300px] md:min-h-[420px]">
        <motion.div layoutId={`content-${project.id}`}>
          <h3 className="text-2xl font-semibold text-[#0B1220]">{project.title}</h3>
          <p className="mt-4 text-sm text-gray-500">
            <strong className="text-gray-700">Industry:</strong> {project.industry}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            <strong className="text-gray-700">Scope:</strong> {project.scope}
          </p>
        </motion.div>

        <div className="flex-1" />

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            {project.description}
          </p>
          <button className="mt-6 w-fit bg-[#FF6B2C] text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow hover:bg-[#e85a1f] transition-colors">
            View project detail
          </button>
        </motion.div>
      </div>

      <motion.div 
        layoutId={`image-${project.id}`}
        className="relative w-full md:w-[45%] aspect-[4/5] rounded-[22px] overflow-hidden bg-[#E5E3DF]"
      >
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/* ---------------- SECONDARY PROJECT CARD ---------------- */
function SecondaryCard({ project, onClick }: { project: any, onClick: () => void }) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onClick}
      className="rounded-[28px] opacity-20 bg-gray-300 p-6 md:p-8  hover:opacity-40 transition-opacity cursor-pointer flex flex-col min-h-[420px] h-full"
    >
      <motion.div layoutId={`content-${project.id}`}>
        <h3 className="text-xl font-semibold text-[#0B1220]">{project.title}</h3>
        <p className="mt-4 text-sm text-gray-500">
          <strong className="text-gray-700">Industry:</strong> {project.industry}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          <strong className="text-gray-700">Scope:</strong> {project.scope}
        </p>
      </motion.div>

      <div className="flex-1" />

      <div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <button className="mt-6 w-fit bg-[#FF6B2C]/40 text-white text-sm font-medium px-5 py-2.5 rounded-lg pointer-events-none">
          View project detail
        </button>
      </div>
      
      {/* Hidden image to help layout transition consistency */}
      <motion.div 
        layoutId={`image-${project.id}`} 
        className="hidden" 
      />
    </motion.div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate indices
  const activeProject = PROJECTS[activeIndex];
  const nextIndex = (activeIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#0B1220] py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.35em] uppercase text-gray-400 font-semibold">
            ◁ FEATURED PROJECTS ▷
          </span>
          <h2 className="mt-4 text-[42px] md:text-[56px] leading-tight font-semibold text-[#F3F3F3]">
            We helped them 3x <br />their revenue
          </h2>
          <p className="mt-3 text-sm text-[#FF6B2C] italic">
            Where ideas take shape
          </p>
        </div>

        {/* Carousel Area */}
        <div className="relative">
          {/* Navigation Buttons (Optional, for better UX) */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
            <button onClick={handlePrev} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
             <button onClick={handleNext} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronRight />
            </button>
          </div>

          {/* Projects Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-stretch h-full">
            
            {/* The Active (Featured) Item */}
            {/* We use layoutId to animate the transition from the secondary slot to here */}
            <FeaturedCard 
              key={activeProject.id} 
              project={activeProject} 
            />

            {/* The Next (Secondary) Item */}
            <SecondaryCard 
              key={nextProject.id} 
              project={nextProject} 
              onClick={handleNext}
            />
            
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? "w-8 h-2 bg-[#FF6B2C]" 
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}