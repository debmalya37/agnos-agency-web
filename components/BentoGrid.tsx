"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronLeft, ChevronRight, House, Laptop } from "lucide-react";

// --- DATA ---
const STRATEGY_SLIDES = [
  {
    title: "Brand Perception",
    quote: "Our design & branding does not clearly say online about who we truly are.",
    sub: "People just like the look and feel, no brand perception."
  },
  {
    title: "Social Engagement",
    quote: "Our social media content is not getting relevant impressions and engagement.",
    sub: "There are only followers and likes on our social accounts as a vanity metric."
  },
  {
    title: "SEO Visibility",
    quote: "When people search for our product, our competitors show before us on Google.",
    sub: "We need organic visibility and traffic to site with the help of SEO."
  },
  {
    title: "Paid Ads ROI",
    quote: "Our competitors are getting consistent leads and online sales from paid ads.",
    sub: "Can Paid Ads really give predictable revenue and positive ROI?"
  }
];

const INDUSTRIES = [
  "E-commerce & D2C",
  "Manufacturing",
  "Real Estate",
  "Local service businesses",
  "Education",
  "Energy"
];

export default function BentoGrid() {
  const [strategyIndex, setStrategyIndex] = useState(0);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);
  
  // 1. Track Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Map Scroll to Industry Index with BUFFER
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;

    // --- KEY FIX: THE BUFFER ZONE ---
    // We only start animating after 25% of the section has been scrolled.
    // This allows the section to "lock" and the user to see the bottom card before changes happen.
    const startBuffer = 0.25; 
    const endBuffer = 0.9;

    if (latest < startBuffer) {
      setIndustryIndex(0); // Stay on first item during entry
    } else if (latest > endBuffer) {
      setIndustryIndex(INDUSTRIES.length - 1); // Stay on last item during exit
    } else {
      // Normalize the progress within the buffer range (0 to 1)
      const progress = (latest - startBuffer) / (endBuffer - startBuffer);
      const rawIndex = Math.floor(progress * INDUSTRIES.length);
      const clampedIndex = Math.min(Math.max(rawIndex, 0), INDUSTRIES.length - 1);
      setIndustryIndex(clampedIndex);
    }
  });

  // 3. Mobile Fallback
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let timer: NodeJS.Timeout;
    if (window.innerWidth < 768) {
      timer = setInterval(() => {
        setIndustryIndex((prev) => (prev + 1) % INDUSTRIES.length);
      }, 2500);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (timer) clearInterval(timer);
    };
  }, [isMobile]);

  // Strategy Controls
  const nextStrategy = () => setStrategyIndex((prev) => (prev + 1) % STRATEGY_SLIDES.length);
  const prevStrategy = () => setStrategyIndex((prev) => (prev === 0 ? STRATEGY_SLIDES.length - 1 : prev - 1));

  return (
    // Height: 350vh gives enough scroll distance for the logic to feel natural
    <section 
      ref={containerRef} 
      className="bg-[#0B1220] relative md:h-[350vh]"
    >
      {/* STICKY FIXES:
         1. h-screen: Ensures the sticky container fits the viewport.
         2. flex items-center: Centers the grid vertically.
         3. overflow-hidden: Prevents double scrollbars, but creates the "frame".
         4. py-10: reduced padding so tall grids don't get cropped as easily.
      */}
      <div className="md:sticky md:top-0 md:h-screen md:flex md:items-center md:overflow-hidden py-10 px-4 md:px-10 font-sans z-10">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 w-full h-fit">
          
          {/* --- Card 1: CSAT --- */}
          <div className="md:col-span-3 bg-white rounded-[2rem] p-8 flex flex-col items-center border border-gray-100 shadow-sm h-full">
            <div className="text-center">
              <h3 className="font-bold text-xl text-[#0B1220]">CSAT</h3>
              <p className="text-[13px] text-gray-500 mt-2 leading-tight">Measures and improves <br /> client satisfaction.</p>
            </div>
            <div className="mt-10 flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#FF6B2C] tracking-[0.2em] uppercase mb-4">Excellent</span>
              <div className="flex gap-2.5">
                {['😔', '😐', '😊', '😁'].map((emoji, i) => (
                  <div key={i} className="text-xl grayscale opacity-30">{emoji}</div>
                ))}
                <div className="text-2xl scale-125 drop-shadow-md">🔥</div>
              </div>
            </div>
          </div>

          {/* --- Card 2: Strategy Carousel --- */}
          <div className="md:col-span-9 bg-white rounded-[2rem] p-5 flex flex-col md:flex-row gap-8 border border-gray-100 shadow-sm overflow-hidden">
            <div className="w-full md:w-[55%] h-56 md:h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000" alt="Strategy" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                {strategyIndex + 1} / {STRATEGY_SLIDES.length}
              </div>
            </div>
            <div className="w-full md:w-[45%] flex flex-col justify-center pr-4 relative">
              <div className="flex items-center justify-between mb-6">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                    <House size={20} className="text-[#0B1220]" />
                 </div>
                 <div className="flex gap-2">
                    <button onClick={prevStrategy} className="p-1.5 rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#0B1220] transition-colors"><ChevronLeft size={18} /></button>
                    <button onClick={nextStrategy} className="p-1.5 rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-[#0B1220] transition-colors"><ChevronRight size={18} /></button>
                 </div>
              </div>
              <div className="relative min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={strategyIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-extrabold text-[#0B1220] mb-3 leading-tight">{STRATEGY_SLIDES[strategyIndex].title}</h3>
                    <p className="text-[14px] text-[#0B1220] font-semibold leading-snug mb-2">"{STRATEGY_SLIDES[strategyIndex].quote}"</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed font-medium">{STRATEGY_SLIDES[strategyIndex].sub}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* --- Card 3: Discuss Project --- */}
          <div className="md:col-span-5 bg-[#FFB677] rounded-[2rem] p-10 relative overflow-hidden min-h-[380px] flex flex-col items-center text-center">
            <h3 className="text-[28px] font-bold text-[#0B1220] mb-8">Discuss your project</h3>
            <button className="bg-[#FF6B2C] text-white px-8 py-4 rounded-2xl font-bold text-[15px] shadow-xl shadow-orange-900/20 relative z-10 hover:bg-[#e85a1f] transition-all">
              Schedule a call - 15 mins free
            </button>
            <p className="text-[13px] text-[#0B1220]/70 mt-4 font-semibold relative z-10">No pressure, just a thoughtful chat.</p>
            <div className="absolute bottom-0 flex gap-2 w-full justify-center px-6">
               {[1, 2, 3, 4].map((id) => (
                 <div key={id} className="w-24 h-32 bg-gray-200 rounded-t-3xl overflow-hidden border-2 border-white translate-y-6 shadow-2xl">
                    <img src={`https://i.pravatar.cc/200?img=${id + 20}`} className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* --- Card 4: SEO --- */}
          <div className="md:col-span-7 bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#0B1220]">How to 3X your business revenue?</h3>
              <p className="text-[15px] text-gray-400 mt-2 font-medium">Complete end to end digital growth solutions.</p>
            </div>
            <div className="flex justify-around items-end pb-2">
              {[ { val: '20%', label: 'Dev' }, { val: '80%', label: 'Marketing', main: true }, { val: '10%', label: 'Auto' } ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`rounded-full flex items-center justify-center font-black border-[6px] ${stat.main ? 'w-28 h-28 text-2xl border-[#FF6B2C] text-[#0B1220]' : `w-20 h-20 text-lg border-orange-600 text-[#0B1220]/60`}`}>
                    {stat.val}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-5 tracking-[0.2em] uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Card 5: Laptop --- */}
          <div className="md:col-span-3 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h3 className="font-bold text-lg text-[#0B1220]">Agency website rebuild</h3>
              <p className="text-[11px] text-[#FF6B2C] font-bold mt-2 uppercase tracking-wider">120% more inquiries</p>
            </div>
            <div className="mt-auto bg-[#F8F9FA] rounded-[1.5rem] p-1 border border-dashed border-gray-200 overflow-hidden">
               <div className="w-full h-28 bg-white rounded-[1.2rem] flex items-center justify-center">
                  <Laptop size={40} className="text-gray-300" />
               </div>
            </div>
          </div>

          {/* --- Card 6: INDUSTRIES SCROLL WHEEL --- */}
          <div className="md:col-span-6 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[280px] overflow-hidden">
            <h3 className="text-lg font-bold text-[#0B1220] mb-8 relative z-10 bg-white px-4">
              Industries we work with
            </h3>
            
            <div className="relative w-full h-[160px] flex justify-center items-center overflow-hidden">
              {INDUSTRIES.map((industry, i) => {
                const offset = i - industryIndex;
                // Only show current, previous, and next
                if (Math.abs(offset) > 1 && !isMobile) return null; 
                
                let mobilePos = 0;
                if (isMobile) {
                   if (i === industryIndex) mobilePos = 0;
                   else if (i === (industryIndex - 1 + INDUSTRIES.length) % INDUSTRIES.length) mobilePos = -1;
                   else if (i === (industryIndex + 1) % INDUSTRIES.length) mobilePos = 1;
                   else return null;
                }

                const position = isMobile ? mobilePos : offset;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-full text-center flex flex-col items-center justify-center"
                    initial={false}
                    animate={{
                      y: position * 50, 
                      scale: position === 0 ? 1 : 0.85,
                      opacity: position === 0 ? 1 : 0.3,
                      zIndex: position === 0 ? 10 : 1,
                      filter: position === 0 ? 'blur(0px)' : 'blur(2px)'
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                  >
                    <span className={`text-lg md:text-xl font-black tracking-wider uppercase transition-colors duration-300 ${position === 0 ? "text-[#FF6B2C]" : "text-gray-400"}`}>
                      {industry}
                    </span>
                  </motion.div>
                );
              })}
              
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          {/* --- Card 7: Dennis Barrett --- */}
          <div className="md:col-span-3 bg-[#0B1220] rounded-[2rem] overflow-hidden relative h-[280px] border border-gray-800">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800" alt="Dennis" className="w-full h-full object-cover saturate-0 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h4 className="text-white font-bold text-lg leading-tight">Dennis Barrett</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">CEO - Aitek</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}