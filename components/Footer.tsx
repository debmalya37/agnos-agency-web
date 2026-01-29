"use client";

import React from "react";
import { ArrowRight, Facebook, Instagram, Linkedin, X, Check } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1220] pt-20 md:pt-32 overflow-hidden font-poppins">
      
      {/* --- Background Arc (Z-0) --- */}
      <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] h-[2000px] bg-[#F3F3F3] rounded-[100%] z-0 pointer-events-none" />

      {/* --- Orbiting Icons Container (Z-10) --- */}
      {/* This creates the "moving along a circular line" effect.
          We create a giant invisible rotating circle centered far below the view.
          The icons are placed on the rim of this circle.
      */}
      <div 
        className="pointer-events-none absolute left-1/2 top-[1200px] z-10 h-[2400px] w-[2400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ animation: 'spin 120s linear infinite' }}
      >
          {/* Left Icon (Notion-style) - Offset negative degrees */}
          <div className="absolute left-1/2 top-0" style={{ transform: 'rotate(-10deg) translateY(-1200px)' }}>
             {/* Counter-rotate wrapper to keep icon upright */}
            <div style={{ animation: 'spin 120s linear infinite reverse' }}>
                 {/* The actual UI Card */}
                <div className="bg-white p-4 rounded-3xl shadow-xl rotate-[-15deg]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-8 h-8 opacity-50 grayscale" />
                </div>
            </div>
          </div>

           {/* Right Icon (Palette) - Offset positive degrees */}
           <div className="absolute left-1/2 top-0" style={{ transform: 'rotate(10deg) translateY(-1200px)' }}>
              {/* Counter-rotate wrapper */}
            <div style={{ animation: 'spin 120s linear infinite reverse' }}>
                 {/* The actual UI Card */}
                <div className="bg-white p-4 rounded-3xl shadow-xl rotate-[15deg]">
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                     </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- Main Content (Z-30 to sit above icons) --- */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 md:px-8">
        
        {/* --- CTA Card --- */}
        <div className="bg-gradient-to-br from-[#FFB677] to-[#FF6B2C] rounded-[3rem] p-8 md:p-16 relative shadow-2xl overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="text-left">
              <span className="text-[10px] font-medium tracking-[0.2em] text-orange-900/60 uppercase mb-4 block">
                Let's build something great
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-[#0B1220] leading-[1.1] mb-8 tracking-tight">
                Ready to start <br /> your next project?
              </h2>
              <button className="bg-[#0B1220] text-white px-8 py-4 rounded-xl font-medium text-sm shadow-xl hover:bg-black transition-all hover:scale-105">
                Get started
              </button>
            </div>

            {/* Right: Booking Widget */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-6 shadow-xl max-w-md mx-auto relative">
                 {/* Header */}
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase">Available for project</span>
                    </div>
                 </div>
                 
                 {/* Avatar + Title */}
                 <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center -space-x-3">
                       <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                       <div className="w-12 h-12 rounded-full bg-[#0B1220] border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                          You
                       </div>
                    </div>
                 </div>

                 <h3 className="text-lg font-medium text-[#0B1220]">Quick 15-minute call</h3>
                 <p className="text-sm text-gray-500 font-medium mb-6">Pick a time that works for you.</p>

                 <button className="w-full bg-[#FF6B2C] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#e85a1f] transition-all">
                    Book a free call
                 </button>

                 {/* Floating Cursor Tag */}
                 <div className="absolute -right-4 top-1/2 bg-[#0B1220] text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg flex items-center gap-1 -rotate-6">
                    <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-white rotate-[-45deg] mb-3" />
                    AMANDA
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Main Footer Content --- */}
        <div className="pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
  <img
    src="/assets/logo.png"
    alt="Aitek logo"
    className="w-10 h-10 object-contain"
  />
  <span className="text-2xl font-medium text-[#0B1220] tracking-tight">
    Aitek
  </span>
</div>

            
            <p className="text-gray-500 font-medium leading-relaxed max-w-xs">
              Crafting digital solutions that move your business forward.
            </p>

            <div className="pt-4">
              <h4 className="text-[#0B1220] font-medium mb-4">Updates that keep you ahead</h4>
              <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm max-w-xs focus-within:ring-2 ring-[#FF6B2C] transition-all">
                 <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-transparent px-4 text-sm font-medium text-[#0B1220] placeholder:text-gray-400 focus:outline-none"
                 />
                 <button className="w-10 h-10 bg-[#FF6B2C] rounded-xl flex items-center justify-center text-white hover:bg-[#e85a1f] transition-colors">
                    <ArrowRight size={18} />
                 </button>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-medium text-gray-400 tracking-[0.2em] uppercase mb-8">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
               <a href="#" className="text-[#FF6B2C] font-medium text-sm">Home</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">Contact us</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">About us</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">Privacy Policy</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">Projects</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">Error 404</a>
               <a href="#" className="text-[#0B1220] font-medium text-sm hover:text-[#FF6B2C] transition-colors">Blog</a>
            </div>
          </div>

          {/* Column 3: Contact & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
             <div>
                <h4 className="text-[11px] font-medium text-gray-400 tracking-[0.2em] uppercase mb-8">
                  Get in touch
                </h4>
                <div className="space-y-4">
                   <p className="text-[#0B1220] font-medium text-lg">+1 (234) 567-89-01</p>
                   <p className="text-[#0B1220] font-medium">support@example.com</p>
                   <p className="text-gray-500 font-medium">1238 Echo Ridge Blvd, Suite 400 <br /> San Francisco, CA 94103, US</p>
                </div>
             </div>

             <div>
                <h4 className="text-[11px] font-medium text-gray-400 tracking-[0.2em] uppercase mb-4">
                  Follow us on
                </h4>
                <div className="flex gap-3">
                   {[Facebook, Instagram, Linkedin, X].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 bg-[#0B1220] rounded-full flex items-center justify-center text-white hover:bg-[#FF6B2C] hover:-translate-y-1 transition-all">
                         <Icon size={18} />
                      </a>
                   ))}
                </div>
             </div>
          </div>

        </div>

        {/* --- Copyright Bar --- */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
           <p>© 2026 Aitek. All rights reserved</p>
           <div className="flex items-center gap-1">
              <span>Developed by <span className="text-[#FF6B2C]">ThinQiT</span>,</span>
              {/* <span>Powered by <span className="text-[#FF6B2C]">Nextjs</span></span> */}
           </div>
        </div>

      </div>
    </footer>
  );
}