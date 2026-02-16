"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------- DATA ---------------- */
/* ---------------- DATA ---------------- */
const STEPS = [
  {
    title: "Strategic Consultation",
    desc: "In-depth client consultations to understand unique business goals and challenges. Conduct comprehensive market research to identify opportunities and trends.",
    tags: "CONSULTATION • RESEARCH • STRATEGY",
  },
  {
    title: "AI Driven Execution",
    desc: "Leverage the latest technologies and tools for efficient work management and project delivery. Optimize websites, social media, paid advertising, and media production using AI insights.",
    tags: "AI OPTIMIZATION • DELIVERY • EXECUTION",
  },
  {
    title: "Continuous Innovation",
    desc: "Regularly analyze campaign performance using AI-driven real-time insights. Provide detailed reports and strategic recommendations for ongoing improvement.",
    tags: "ANALYSIS • REPORTING • GROWTH",
  },
];


/* ---------------- SEMICIRCLE COMPONENT ---------------- */
function Semicircle({ active }: { active: number }) {
  const step = STEPS[active];

  return (
    <div className="relative w-[900px] max-w-full">
      <svg viewBox="0 -120 1000 620" className="w-full" fill="none">
        {/* Grey Background Path (Static Arc) */}
        <path
          d="M50 500 A450 450 0 0 1 950 500"
          stroke="#E6E3DE"
          strokeWidth="2"
        />

        {/* ROTATING STEPS 
          We map through ALL steps and calculate their position based on the 'active' index.
          If index === active, it goes to Top Center (90 degrees).
          Others rotate around it.
        */}
        {STEPS.map((_, index) => {
          // SPACING: 45 degrees (PI/4) between each step
          const spacing = Math.PI / 4;
          
          // ANGLE LOGIC:
          // Top Center is PI/2 (90 degrees).
          // We offset based on how far this step is from the active one.
          // (active - index) ensures that as we increase the active index (scroll down),
          // the items move to the LEFT (Counter-Clockwise visual flow).
          const angle = Math.PI / 2 + (active - index) * spacing;

          // POLAR TO CARTESIAN:
          // Center is (500, 500), Radius is 450.
          const x = 500 + 450 * Math.cos(angle);
          const y = 500 - 450 * Math.sin(angle);

          const isActive = index === active;

          return (
            <motion.g
              key={index}
              animate={{ x, y }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            >
              {/* The group <g> moves to x,y. 
                 Inside, we draw the rect centered at 0,0 relative to the group.
              */}
              <motion.rect
                x={-18}
                y={-18}
                rx="8"
                width="36"
                height="36"
                animate={{
                  fill: isActive ? "#FF6B2C" : "#FFFFFF",
                  stroke: isActive ? "#FF6B2C" : "#E5E3DF",
                  scale: isActive ? 1.1 : 1
                }}
              />
              <motion.text
                x={0}
                y={5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                animate={{
                  fill: isActive ? "#FFFFFF" : "#999999"
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>

      {/* TEXT CONTENT (Fades in/out below the arc) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center pt-[140px] md:pt-[180px] text-center px-6 pointer-events-none"

        >
          <span className="text-[11px] tracking-widest text-gray-400 uppercase font-medium bg-[#F6F4F1] px-3 py-1 rounded-md mb-6">

            Process
          </span>

          <h3 className="text-[28px] md:text-[40px] font-medium text-[#F3F3F3] mb-4 tracking-tight">
            {step.title}
          </h3>

          <p className="text-lg text-gray-300 max-w-md leading-relaxed mb-8">
            {step.desc}
          </p>

          <p className="text-[11px] font-medium tracking-[0.2em] text-gray-400 mb-10 uppercase">
            {step.tags}
          </p>

          <Link href="/contact" className="bg-[#FF6B2C] text-white px-10 py-4 rounded-2xl font-medium text-sm shadow-xl shadow-orange-200 pointer-events-auto hover:bg-[#e85a1f] transition-all transform hover:scale-105">
            Start your project
          </Link>

          {/* Progress Dots */}
          <div className="mt-12 flex gap-3">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-[#FF6B2C]" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- MAIN SECTION ---------------- */
export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate scroll progress within the 500vh container
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 0.99);
      
      const newActive = Math.floor(clampedProgress * STEPS.length);
      setActive(newActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="bg-[#000000] relative h-[320vh]">

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* HEADER */}
        <div className="absolute top-16 text-center w-full px-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-medium">
            PROCESS
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-medium text-[#F3F3F3] tracking-tight">
            A collaborative approach
          </h2>
        </div>

        <div className="w-full flex justify-center pt-4">
          <Semicircle active={active} />
        </div>
      </div>
    </section>
  );
}