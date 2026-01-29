"use client";

import React from "react";
import { Plus } from "lucide-react";

const FAQS = [
  "How long does a typical project take?",
  "Do you work with startups or only large brands?",
  "What’s included in your design packages?",
  "Do you provide development services too?",
  "How do we start a project?",
  "Can you help with ongoing updates after launch?",
];

export default function FAQSection() {
  return (
    <section className="bg-[#0B1220] py-24 px-4 md:px-10 font-sans overflow-hidden justify-center items-center align-center">
          <div className="w-full flex justify-center mb-4">
  <div className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
    <span>{">"}</span> GOT QUESTIONS <span>{"<"}</span>
  </div>
</div>

      <div className="max-w-3xl mx-auto relative items-center self-center justify-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-[#F3F3F3] tracking-tight relative inline-block">
            We’ve got answers
            
            {/* Hand-drawn Annotation */}
            <div className="absolute -right-32 top-0 hidden md:block">
               <span className="font-handwriting text-[#FF6B2C] text-sm block mb-1">
                 Let's clear things up
               </span>
               <svg width="40" height="30" viewBox="0 0 50 20" fill="none" className="text-[#FF6B2C] rotate-60 ml-4">
                 <path d="M10 5 Q 30 5, 40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                 <path d="M35 25 L 40 30 L 45 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
               </svg>
            </div>
          </h2>
        </div>

        {/* FAQ List Container */}
        <div className="bg-[#EAEAEA] rounded-[2.5rem] p-3 md:p-6 shadow-sm border border-gray-100/50">
          <div className="flex flex-col gap-3">
            {FAQS.map((question, index) => (
              <button 
                key={index} 
                className="group bg-white rounded-2xl p-6 md:px-8 md:py-6 flex items-center justify-between w-full text-left hover:shadow-md transition-all duration-300 active:scale-[0.99]"
              >
                <span className="text-[#0B1220] font-bold text-base md:text-lg pr-4">
                  {index + 1}. {question}
                </span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#0B1220] flex items-center justify-center shrink-0 group-hover:bg-[#FF6B2C] transition-colors">
                  <Plus size={16} className="text-white md:w-5 md:h-5" strokeWidth={3} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="mt-16 flex flex-col items-center">
          {/* Avatar Stack */}
          <div className="flex -space-x-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#F3F3F3] overflow-hidden bg-gray-200">
                <img 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Support team" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
          
          <h4 className="text-[#0B1220] font-bold text-lg mb-4">Still have questions?</h4>
          
          <button className="bg-[#FF6B2C] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-orange-900/10 hover:bg-[#e85a1f] hover:-translate-y-1 transition-all">
            Let's talk
          </button>
        </div>

      </div>
    </section>
  );
}