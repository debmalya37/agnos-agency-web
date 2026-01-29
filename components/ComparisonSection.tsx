"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";

const otherAgencies = [
  "Slow, unclear timelines",
  "Extra charges for changes",
  "No clear process",
  "Designs break in dev",
  "Complex, hard builds",
];

const agnosBenefits = [
  "Clear weekly updates",
  "Transparent pricing",
  "Documented workflow",
  "Design–dev alignment",
  "Clean, scalable builds",
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-[#0B1220] px-4 font-poppins">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center max-w-5xl mb-12">
          <h2 className="text-3xl md:text-3xl font-medium text-[#F3F3F3] leading-[1.15] mb-8">
            We know choosing the right agency <br />
            is hard because few <span className="text-[#FF6B2C]">truly deliver</span>.
          </h2>
          
          {/* Sub-header Pill */}
          <div className="inline-flex flex-wrap justify-center max-w-2xl items-center gap-x-2 gap-y-3 px-2 py-5">
            <span className="text-2xl md:text-3xl font-medium text-[#F3F3F3]">So we made it</span>
            <span className="text-2xl md:text-3xl font-medium text-[#FF6B2C]">to compare</span>
            <span className="text-2xl md:text-3xl font-medium text-[#F3F3F3]">how we work</span>
            
            {/* Custom Orange Toggle */}
            <div className="w-14 h-7 bg-[#FF6B2C] rounded-full relative flex items-center px-1 mx-1">
               <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
            </div>
            
            <span className="text-2xl md:text-3xl font-medium text-[#F3F3F3]">versus what you usually</span>
            <span className="text-2xl md:text-3xl font-medium text-[#F3F3F3]">get <span className="text-[#FF6B2C]">in the market.</span></span>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="relative w-full max-w-4xl mt-12 flex flex-col md:flex-row items-center justify-center">
          
          {/* Card: Other Agencies */}
          <div className="w-full md:w-[480px] bg-white rounded-[2rem] p-10 md:pr-24 shadow-sm border border-gray-100 z-10 relative">
            <h3 className="text-2xl font-bold text-[#111] mb-10">Other agencies</h3>
            <ul className="space-y-0">
              {otherAgencies.map((item, idx) => (
                <li key={idx} className={`flex items-center gap-4 py-5 text-[#999] font-medium ${idx !== otherAgencies.length - 1 ? 'border-b border-dotted border-gray-200' : ''}`}>
                  <ChevronRight size={18} className="text-[#CCC]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card: Aitek/Agnos Media */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-[460px] bg-[#FF9E58] rounded-[2rem] p-10 shadow-2xl md:-ml-16 z-20 mt-6 md:mt-0"
          >
            <h3 className="text-2xl font-bold text-[#111] mb-10">Aitek Media</h3>
            <ul className="space-y-0">
              {agnosBenefits.map((item, idx) => (
                <li key={idx} className={`flex items-center gap-4 py-5 text-[#111] font-bold ${idx !== agnosBenefits.length - 1 ? 'border-b border-dotted border-[#e08b4d]' : ''}`}>
                  <ChevronRight size={18} className="text-[#111]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer/Social Proof */}
        <div className="mt-16 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 px-4">
          <button className="bg-[#FF6B2C] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#e85a1f] transition-all shadow-xl shadow-orange-100">
            Read our story
          </button>

          <div className="flex items-center gap-6">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[11, 12, 13].map((id) => (
                <img 
                  key={id}
                  src={`https://i.pravatar.cc/100?img=${id}`} 
                  alt="user" 
                  className="w-12 h-12 rounded-full border-4 border-[#F3F3F3] object-cover bg-gray-200"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#F3F3F3] bg-white flex items-center justify-center text-xs font-bold text-gray-400">
                +52
              </div>
            </div>

            {/* Ratings */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FF6B2C] text-[#FF6B2C]" />
                ))}
                <span className="text-sm font-black ml-2 text-[#111]">4.5/5</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Trusted by <span className="text-[#FF6B2C] font-bold text-sm">54+</span> visionary brands
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}