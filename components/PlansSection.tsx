"use client";

import React, { useRef, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

const PLANS = [
  {
    title: "Landing Page",
    desc: "Launch products and validate ideas fast without the wait.",
    cost: "₹15k",
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
    desc: "Build trust and authority with a professional digital presence.",
    cost: "₹25k",
    features: [
      "Strategy & discovery session",
      "Up to 5-6 pages",
      "CMS integration (Sanity/Contentful)",
      "SEO foundational setup",
      "Lead generation forms",
      "48-hour response time",
    ],
    popular: true, 
  },
  {
    title: "E-commerce Website",
    desc: "A robust online store designed to convert browsers into buyers.",
    cost: "₹40k",
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
    desc: "Tailored full-stack applications for complex business needs.",
    cost: "₹75k",
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // --- CAL.COM SETUP ---
  const CAL_NAMESPACE = "30min";
  const CAL_LINK = "aitekmedia/30min";

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

  const handleBookPlan = async (title: string, cost: string) => {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    const noteText = `I am interested in the ${title} plan (Starting at ${cost}).`;
    const dynamicLink = `${CAL_LINK}?notes=${encodeURIComponent(noteText)}`;

    cal("modal", {
        calLink: dynamicLink,
        config: { layout: "month_view", theme: "dark" }
    });
  };

  // --- SCROLL HANDLER FOR ARROWS ---
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -340 : 340; // Approx card width
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF6B2C]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF9A5C] mb-4">Transparent Pricing</p>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">
            Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Growth.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            No hidden fees. No surprises. Just clear, milestone-based pricing designed to get you ROI faster.
          </p>
        </div>

          {/* Mobile Arrows (Visible only on Mobile/Tablet) */}
          <div className="flex gap-3 justify-center lg:hidden">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Cards Container 
           - Added `pt-12` to prevent badge cropping
           - Attached `ref` for buttons to work
        */}
        <div 
          ref={scrollContainerRef}
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory pt-12 pb-8 
            lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pt-6 lg:pb-0
            scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0
          "
        >
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={`
                relative flex-shrink-0 w-[85vw] sm:w-[360px] lg:w-auto
                snap-center flex flex-col h-full rounded-[32px] p-1 
                ${plan.popular 
                  ? "bg-gradient-to-b from-[#FF6B2C]/40 to-white/5" 
                  : "bg-white/5 border border-white/5"}
              `}
            >
              {/* Popular Tag - Now won't be cropped due to container padding */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B2C] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg z-20 flex items-center gap-1 whitespace-nowrap">
                  <Sparkles size={10} /> Most Popular
                </div>
              )}

              <div className="bg-[#0E0E0E] rounded-[30px] p-8 flex flex-col h-full relative overflow-hidden">
                {/* Card Content */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-2">{plan.title}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-sm text-gray-500 font-medium">Starting from</span>
                      <span className="text-3xl font-bold text-white tracking-tight">{plan.cost}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {plan.desc}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-[#FF6B2C]/20 text-[#FF6B2C]" : "bg-white/10 text-gray-400"}`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={() => handleBookPlan(plan.title, plan.cost)}
                  className={`
                    w-full py-4 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg mt-auto
                    ${plan.popular 
                      ? "bg-[#FF6B2C] text-black hover:bg-[#ff854f] hover:shadow-[#FF6B2C]/25" 
                      : "bg-white text-black hover:bg-gray-200"}
                  `}
                >
                  Book A Strategy Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator / Hint */}
        <div className="mt-4 flex justify-center gap-2 lg:hidden text-xs text-gray-600 font-medium">
           <span className="opacity-50">Swipe to compare plans</span>
        </div>

      </div>
    </section>
  );
}