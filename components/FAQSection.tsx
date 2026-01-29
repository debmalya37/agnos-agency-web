"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = [
  {
    question: "How long does a typical project take?",
    answer: "Most branding and web projects take between 4-8 weeks, depending on the complexity and scope. We provide a detailed timeline during our initial discovery call."
  },
  {
    question: "Do you work with startups or only large brands?",
    answer: "We work with ambitious companies of all sizes. From early-stage startups looking for their first identity to established enterprises needing a complete digital overhaul."
  },
  {
    question: "What’s included in your design packages?",
    answer: "Our packages are tailored to your needs but typically include brand strategy, visual identity (logo, color, type), UI/UX design, and development handoff."
  },
  {
    question: "Do you provide development services too?",
    answer: "Yes! We specialize in Next.js, Framer, and Webflow development. We build pixel-perfect, SEO-optimized websites that scale with your business."
  },
  {
    question: "How do we start a project?",
    answer: "It starts with a discovery call where we learn about your goals. If we're a good fit, we'll send a proposal and roadmap to get things moving immediately."
  },
  {
    question: "Can you help with ongoing updates after launch?",
    answer: "Absolutely. We offer retainer packages for ongoing design support, development maintenance, and performance optimization post-launch."
  },
];

export default function FAQSection() {
  // Track which FAQ is open (null = all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0B1220] py-24 px-4 md:px-10 font-poppins overflow-hidden">
      
      {/* Top Label */}
      <div className="w-full flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
          <span>{">"}</span> GOT QUESTIONS <span>{"<"}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#F3F3F3] tracking-tight relative inline-block">
            We’ve got answers
            
            {/* Hand-drawn Annotation */}
            <div className="absolute -right-32 top-0 hidden md:block">
               <span className="font-handwriting text-[#FF6B2C] text-sm block mb-1">
                 Let's clear things up
               </span>
               <svg width="40" height="30" viewBox="0 0 50 20" fill="none" className="text-[#FF6B2C] rotate-6 ml-4">
                 <path d="M10 5 Q 30 5, 40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                 <path d="M35 25 L 40 30 L 45 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
               </svg>
            </div>
          </h2>
        </div>

        {/* FAQ List Container */}
        <div className="bg-[#EAEAEA] rounded-[2.5rem] p-3 md:p-6 shadow-sm border border-gray-100/50">
          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 md:px-8 md:py-6 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors"
                  >
                    <span className={`font-bold text-base md:text-lg pr-4 transition-colors ${isOpen ? 'text-[#FF6B2C]' : 'text-[#0B1220]'}`}>
                      {index + 1}. {item.question}
                    </span>
                    
                    {/* Toggle Icon */}
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#FF6B2C] rotate-180' : 'bg-[#0B1220] group-hover:bg-[#FF6B2C]'}`}>
                      {isOpen ? (
                        <Minus size={16} className="text-white md:w-5 md:h-5" strokeWidth={3} />
                      ) : (
                        <Plus size={16} className="text-white md:w-5 md:h-5" strokeWidth={3} />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 text-gray-600 leading-relaxed font-medium">
                          <div className="w-full h-px bg-gray-100 mb-4" /> {/* Divider */}
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="mt-16 flex flex-col items-center">
          {/* Avatar Stack */}
          <div className="flex -space-x-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B1220] overflow-hidden bg-gray-200">
                <img 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Support team" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
          
          <h4 className="text-[#F3F3F3] font-bold text-lg mb-4">Still have questions?</h4>
          
          <button className="bg-[#FF6B2C] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-orange-900/10 hover:bg-[#e85a1f] hover:-translate-y-1 transition-all">
            Let's talk
          </button>
        </div>

      </div>
    </section>
  );
}