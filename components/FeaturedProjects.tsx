"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- DATA ---------------- */
/* ---------------- DATA ---------------- */
const PROJECTS = [
  {
    id: 1,
    title: "Satav Patil Paper Industries",
    industry: "Manufacturing",
    scope: "Brand Identity & Logo Design",
    description:
      "Brought their eco-friendly and green planet vision of food products into reality with subtle and clear identity for local as well global market.",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900f7d4?q=80&w=800",
  },
  {
    id: 2,
    title: "Switchsol",
    industry: "Solar Energy Solutions",
    scope: "Website Design & Development + Paid Ads",
    description:
      "Created a strong digital growth foundation with the help of new business websites & landing pages for qualified lead generation.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800",
  },
  {
    id: 3,
    title: "Kokanraj",
    industry: "FMCG E-commerce",
    scope: "SEO",
    description:
      "Drove organic visibility and Google rankings for specific product keywords with the help of search engine marketing.",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=800",
  },
  {
    id: 4,
    title: "Zero2 Commune",
    industry: "Offline Retail",
    scope: "Social Media Marketing",
    description:
      "Tested MVP of photoshoot props in Pune market with social media marketing and generated initial demand traction.",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=800",
  },
  {
    id: 5,
    title: "Siddhi Vinayak Properties",
    industry: "Real Estate Consultant",
    scope: "Paid Ads",
    description:
      "Ran Meta Ads campaigns for hyper-targeted audiences to drive site visits and project bookings for a real estate launch in Pune.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800",
  },
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
  We helped them create positive brand impact <br /> and revenue growth
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