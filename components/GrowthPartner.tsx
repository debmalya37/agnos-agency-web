"use client";

import React from "react";
import { Check, Flame } from "lucide-react";

export default function GrowthPartner() {
  return (
    <section className="bg-[#000000] py-24 px-4 md:px-10 font-poppins">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-medium tracking-[0.3em] text-gray-400 uppercase">
            Work With
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium text-[#F3F3F3] leading-[1.1] tracking-tight">
            We work with limited brands to <br className="hidden md:block" />
            give our 100% to their business
          </h2>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#fbe2d4] rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden">
          <div className="flex  items-center justify-center">
            
            {/* Left Side: Empty Space / Minimal graphic area */}
            

            {/* Right Side: The Orange Card */}
            <div className="bg-[#FF9E58] rounded-[2rem] p-8 md:p-10 relative shadow-2xl shadow-orange-900/10 overflow-hidden">
              
              {/* Inner White Card */}
              <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase">
                    We work as a growth partner
                  </span>
                  <span className="bg-[#FF6B2C] text-white text-[9px] font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-[#555] mt-4 leading-tight">
                  Best for growing brands looking <br />
                  to scale their digital presence.
                </h3>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px border-t border-dashed border-orange-300/50 mb-8" />

              {/* Checklist */}
              <ul className="space-y-4 mb-10 relative z-10">
                {[
                  "Businesses already generating leads or sales",
                  "Founders investing in growth systems",
                  "Business serious to grow",
                  "Businesses ready to grow with system",
                  "Not for clients looking for cheaper alternatives",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-white rounded-full p-0.5 shrink-0">
                      <Check size={12} className="text-[#FF6B2C] stroke-[4]" />
                    </div>
                    <span className="text-white font-semibold text-sm md:text-[15px] leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="bg-[#000000] text-white px-8 py-4 rounded-xl font-medium text-sm hover:bg-black transition-all shadow-lg relative z-10 w-full md:w-auto">
                Start your project
              </button>

              {/* Decorative Flame Icon */}
              <div className="absolute -bottom-4 -right-4 text-orange-600/20 rotate-12 pointer-events-none">
                 <Flame size={180} fill="currentColor" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12">
          <p className="text-gray-500 font-medium text-sm md:text-base">
            For agencies and enterprises needing <br /> custom strategy and execution.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-[#FF6B2C] font-medium text-sm mt-2 hover:underline decoration-2 underline-offset-4">
            Contact us <span>{">"}</span>
          </a>
        </div>

      </div>
    </section>
  );
}