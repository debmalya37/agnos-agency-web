"use client";

import React from "react";
import { motion } from "framer-motion";
import { Paintbrush, Layout, Code2, Cpu, Megaphone } from "lucide-react";

const services = [
  {
    title: "Design",
    description:
      "We craft high-impact brand and digital design that communicates clearly, feels modern, and builds trust across every customer touchpoint.",
    icon: <Paintbrush className="text-[#FF6B2C]" size={24} />,
    tags: ["BRANDING", "UI/UX", "VISUAL SYSTEM"],
  },
  {
    title: "Marketing",
    description:
      "We build demand engines that drive measurable growth using SEO, paid ads, social media strategy, and high-performing video production.",
    icon: <Megaphone className="text-[#FF6B2C]" size={24} />,
    tags: ["SEO", "PAID ADS", "SOCIAL MEDIA", "VIDEO"],
  },
  {
    title: "Technology",
    description:
      "We develop scalable digital infrastructure including websites, apps, SaaS platforms, and AI-powered tools built for long-term growth.",
    icon: <Cpu className="text-[#FF6B2C]" size={24} />,
    tags: ["WEBSITES", "APPS", "AI TOOLS", "SAAS"],
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#0B1220] py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Sticky Header Content */}
        <div className="lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-6">
            <span className="text-[#FF6B2C]">{"//"}</span> WHAT WE DO
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-[#F3F3F3] leading-[1.1] tracking-tight mb-10">
            Services built <br /> to drive impact
          </h2>
          
          <div className="relative inline-block group">
            <button className="bg-[#FF6B2C] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/10 hover:bg-[#e85a1f] transition-all">
              Discuss your ideas
            </button>
            {/* Hand-drawn arrow effect */}
            <div className="absolute -right-24 top-0 hidden md:block">
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M5.5653 0.112331C5.4078 0.265144 5.24373 0.409519 5.07311 0.546394L4.98217 0.617644C4.86566 0.706631 4.74687 0.792597 4.62592 0.875456C4.27248 1.11921 3.90405 1.33952 3.53092 1.55233C2.7828 1.97889 2.01498 2.37358 1.29873 2.85264C0.880608 3.13108 0.479358 3.43858 0.115608 3.78452C-0.110329 4.00014 0.0199823 4.34983 0.289982 4.44264C1.34554 4.80739 2.3892 5.20572 3.41936 5.63702L3.48873 5.66514L3.50467 5.67264C4.43839 6.06848 5.36064 6.49084 6.27029 6.93921C6.45498 7.03014 6.70529 6.99546 6.80936 6.79858C6.90311 6.62046 6.86561 6.35702 6.66873 6.25952C4.87777 5.37612 3.03862 4.59395 1.15998 3.91671L1.16842 3.91108L1.21717 3.87171C1.34777 3.77188 1.48126 3.6759 1.61748 3.58389C1.97422 3.34484 2.34045 3.12028 2.71529 2.91077C3.46436 2.48514 4.23123 2.08952 4.94655 1.60764C5.36512 1.32982 5.7585 1.0158 6.12217 0.669206C6.2703 0.525769 6.27686 0.254831 6.12217 0.112331C6.04739 0.0402655 5.94758 0 5.84373 0C5.73988 0 5.64007 0.0402655 5.5653 0.112331Z" fill="#FF6321"/>
</svg>

                <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.394075 0.0841651C0.189699 0.10104 -0.00905037 0.252915 0.000324249 0.477915C0.00969887 0.67479 0.1747 0.890415 0.394075 0.871665C2.98722 0.649017 5.59936 0.864529 8.12095 1.50917C9.37789 1.82876 10.6074 2.2479 11.7978 2.7626C12.9918 3.28432 14.1415 3.90197 15.2356 4.60948C16.3268 5.31034 17.3539 6.10625 18.305 6.98791C19.2438 7.85529 20.1075 8.80054 20.8869 9.81354C21.679 10.8499 22.3851 11.9491 22.9981 13.1004C23.6055 14.2324 24.1176 15.4131 24.5291 16.6301C25.0006 18.0157 25.3454 19.4412 25.5594 20.8892L25.5875 21.0935L25.5922 21.1245L25.596 21.1526L25.6175 21.3167C25.7374 22.2889 25.7963 23.2677 25.7938 24.2473C25.7928 24.5651 25.7844 24.882 25.7703 25.1989C25.761 25.4051 25.9578 25.602 26.1641 25.5926C26.2678 25.5904 26.3667 25.5483 26.4401 25.4749C26.5135 25.4015 26.5557 25.3026 26.5578 25.1989C26.6701 22.5253 26.3342 19.8518 25.5641 17.2892C24.804 14.7383 23.6357 12.3274 22.1047 10.1501C20.5578 7.95557 18.6483 6.04067 16.4581 4.4876C14.274 2.94772 11.8531 1.77478 9.29095 1.0151C6.71686 0.244249 4.03217 -0.091615 1.34751 0.0213525C1.02876 0.035415 0.711887 0.0560401 0.394075 0.0841651Z" fill="#FF6321"/>
</svg>

               <span className="text-sm font-handwriting italic text-[#FF6B2C] block translate-y-2 translate-x-2">
                 Let's get started
               </span>
            </div>
          </div>
        </div>

        {/* Right Side: Service Cards */}
        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0B1220]">{service.title}</h3>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                  {service.icon}
                </div>
              </div>

              {/* Dotted/Dashed Line */}
              <div className="w-full h-px border-b border-dashed border-gray-200 mb-8" />

              <p className="text-[#666] text-base md:text-lg leading-relaxed font-medium mb-12 max-w-[90%]">
                {service.description}
              </p>

              {/* Tags Container */}
              <div className="flex flex-wrap gap-3">
                {service.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-5 py-2 rounded-full bg-[#F8F9FA] border border-gray-200 text-[10px] font-bold tracking-widest text-gray-400 group-hover:border-gray-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}