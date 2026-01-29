"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Laptop, House } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="bg-[#0B1220] py-20 px-4 md:px-10 font-poppins">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* --- Card 1: CSAT --- */}
        <div className="md:col-span-3 bg-white rounded-[2rem] p-8 flex flex-col items-center border border-gray-100 shadow-sm h-full">
          <div className="text-center">
            <h3 className="font-bold text-xl text-[#0B1220]">CSAT</h3>
            <p className="text-[13px] text-gray-500 mt-2 leading-tight">
              Measures and improves <br /> client satisfaction.
            </p>
          </div>
          <div className="mt-auto pt-10 flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#FF6B2C] tracking-[0.2em] uppercase mb-4">Excellent</span>
            <div className="flex gap-2.5">
              {['😔', '😐', '😊', '😁'].map((emoji, i) => (
                <div key={i} className="text-xl grayscale opacity-30">{emoji}</div>
              ))}
              <div className="text-2xl scale-125 drop-shadow-md">🔥</div>
            </div>
          </div>
        </div>

        {/* --- Card 2: Strategy --- */}
        <div className="md:col-span-9 bg-white rounded-[2rem] p-5 flex flex-col md:flex-row gap-8 border border-gray-100 shadow-sm overflow-hidden">
          <div className="w-full md:w-[55%] h-56 md:h-64 bg-gray-100 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000" 
              alt="Strategy session" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-[45%] flex flex-col justify-center pr-4">
            <div className="flex items-center justify-between mb-6">
               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                  <House size={20} className="text-[#0B1220]" />
               </div>
               <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg border border-gray-100 text-gray-300 hover:bg-gray-50 transition-colors"><ChevronLeft size={18} /></button>
                  <button className="p-1.5 rounded-lg border border-gray-100 text-[#0B1220] hover:bg-gray-50 transition-colors"><ChevronRight size={18} /></button>
               </div>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B1220] mb-3">Strategy that matters</h3>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Thoughtful direction aligned <br /> with real business goals.
            </p>
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

        {/* --- Card 4: SEO & Performance --- */}
        <div className="md:col-span-7 bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm flex flex-col">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1220]">SEO ready & fast performance</h3>
            <p className="text-[15px] text-gray-400 mt-2 font-medium">Optimized for search rankings and blazing-fast speed.</p>
          </div>
          <div className="flex justify-around items-end mt-auto pb-4">
            {[ 
                { val: '99%', label: 'PERFORMANCE', color: 'border-orange-100' }, 
                { val: '100%', label: 'SEO', main: true }, 
                { val: '98%', label: 'ACCESSIBILITY', color: 'border-orange-100' } 
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`rounded-full flex items-center justify-center font-black border-[6px] ${stat.main ? 'w-28 h-28 text-2xl border-[#FF6B2C] text-[#0B1220]' : `w-20 h-20 text-lg ${stat.color} text-[#0B1220]/60`}`}>
                  {stat.val}
                </div>
                <span className="text-[10px] font-bold text-gray-400 mt-5 tracking-[0.2em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Card 5: Website Rebuild --- */}
        <div className="md:col-span-3 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-[#0B1220] leading-tight">Agency website <br /> rebuild</h3>
            <p className="text-[11px] text-[#FF6B2C] font-bold mt-2 uppercase tracking-wider">120% more inquiries</p>
          </div>
          <div className="mt-auto bg-[#F8F9FA] rounded-[1.5rem] p-1 border border-dashed border-gray-200 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400" className="w-full h-28 object-cover rounded-[1.2rem] opacity-90" />
          </div>
        </div>

        {/* --- Card 6: Industries --- */}
        <div className="md:col-span-6 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-lg font-bold text-[#0B1220] mb-8">Industries we work with</h3>
          <div className="w-full max-w-sm space-y-5">
             {['ARCHITECTURE & INTERIORS', 'EDUCATION & LEARNING', 'HOSPITALITY & EVENTS'].map((text, i) => (
               <div key={i} className="flex flex-col items-center">
                  <div className="text-[11px] font-black text-[#FFB677] tracking-[0.3em] uppercase">{text}</div>
                  {i < 2 && <div className="w-full h-px bg-dotted border-b border-dotted border-gray-100 mt-5" />}
               </div>
             ))}
          </div>
        </div>

        {/* --- Card 7: Dennis Barrett --- */}
        <div className="md:col-span-3 bg-[#0B1220] rounded-[2rem] overflow-hidden relative h-[280px]">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800" 
            alt="Dennis Barrett" 
            className="w-full h-full object-cover saturate-0 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h4 className="text-white font-bold text-lg leading-tight">Dennis Barrett</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">CEO - AGNOS</p>
          </div>
        </div>

      </div>
    </section>
  );
}