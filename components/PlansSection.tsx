"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// 1. Import Cal.com API
import { getCalApi } from "@calcom/embed-react"; 

const PLANS = [
  {
    title: "Landing Page",
    desc: "For startups launching products, testing offers, or validating ideas fast without waiting weeks.",
    cost: "Starting from ₹15k",
    features: [
      "Strategy & discovery session",
      "Conversion copywriting",
      "Mobile-optimized design",
      "Unlimited revisions",
      "Analytics setup",
      "48-hour response time",
    ],
  },
  {
    title: "Business Website",
    desc: "For agencies and consultants needing a professional digital presence that builds trust and authority.",
    cost: "Starting from ₹25k",
    features: [
      "Strategy & discovery session",
      "Up to 5-6 pages",
      "CMS integration (Sanity/Contentful)",
      "SEO foundational setup",
      "Lead generation forms",
      "48-hour response time",
    ],
  },
  {
    title: "E-commerce Website",
    desc: "For businesses that need a robust online store that actually converts browsers into buyers.",
    cost: "Starting from ₹40k",
    features: [
      "Shopify or WooCommerce setup",
      "Product catalog migration",
      "Payment gateway integration",
      "Conversion rate optimization",
      "Cart abandonment flows",
      "Priority support",
    ],
  },
  {
    title: "Web / Mobile App",
    desc: "Full-stack web or mobile applications tailored to complex business logic and user needs.",
    cost: "Starting from ₹75k",
    features: [
      "System architecture design",
      "React Native or Next.js",
      "API development & integration",
      "User authentication & database",
      "Testing & QA",
      "Dedicated project manager",
    ],
  },
];

export default function PlansSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const x = useMotionValue(0);

  // --- CAL.COM SETUP ---
  const CAL_NAMESPACE = "30min";
  const CAL_LINK = "aitek-media/30min";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        theme: "dark"
      });
    })();
  }, []);

  // --- BOOKING HANDLER ---
  const handleBookPlan = async (title: string, cost: string) => {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    
    // Create a specific note for this booking
    const noteText = `I am interested in the ${title} plan (${cost}).`;
    
    // Append params to the link to pre-fill the booking notes
    const dynamicLink = `${CAL_LINK}?notes=${encodeURIComponent(noteText)}`;

    cal("modal", {
        calLink: dynamicLink,
        config: {
            layout: "month_view",
            theme: "dark"
        }
    });
  };

  // 1. Check Screen Size & Calculate Constraints
  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 768;
      setIsDesktop(isLarge);

      if (containerRef.current && !isLarge) {
        const scrollWidth = containerRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      } else {
        x.set(0); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x]);

  // Mobile Slide Logic
  const slide = (direction: "left" | "right") => {
    if (isDesktop) return; 
    const currentX = x.get();
    const cardWidth = 340; 
    let newX = direction === "left" ? currentX + cardWidth : currentX - cardWidth;

    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;

    animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Plans</h2>
            <p className="text-gray-400 max-w-xl">
              Let's see how we can fix the issues that are holding you back from driving more revenue today!
            </p>
          </div>
          
          {/* Navigation Buttons (Only visible on Mobile now) */}
          {!isDesktop && (
            <div className="flex gap-3 self-end md:hidden">
              <button
                onClick={() => slide("left")}
                className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => slide("right")}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        <motion.div 
          ref={containerRef} 
          className="cursor-grab active:cursor-grabbing md:cursor-auto"
        >
          <motion.div
            drag={isDesktop ? false : "x"}
            dragConstraints={{ right: 0, left: -width }}
            style={{ x }}
            className="flex gap-6 md:grid md:grid-cols-2 md:gap-8"
          >
            {PLANS.map((plan, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] md:min-w-0 bg-[#0E0E0E] border border-gray-800 rounded-3xl p-8 flex flex-col hover:border-gray-700 transition-colors h-full"
              >
                {/* Card Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3">{plan.title}</h3>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 min-h-[80px] flex items-center">
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="text-white w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
                      <span className="text-gray-300 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button with Cost & Booking Trigger */}
                <button 
                  onClick={() => handleBookPlan(plan.title, plan.cost)}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300 mt-auto hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5"
                >
                  {plan.cost}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile Indicator / Hint */}
        {!isDesktop && (
          <div className="mt-8 flex justify-center gap-2 md:hidden">
            {PLANS.map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-800" />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}