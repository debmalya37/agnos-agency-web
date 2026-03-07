"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projectImages = [
  "assets/1.jpeg", 
  "assets/2.jpeg", 
  "assets/3.jpeg", 
  "assets/4.jpeg", 
];

const MarqueeRow = ({ images, direction = "left" }: { images: string[], direction?: "left" | "right" }) => {
  return (
    <div className="flex overflow-hidden select-none gap-4 md:gap-6 py-2 md:py-4">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        className="flex flex-nowrap gap-4 md:gap-6 min-w-full"
      >
        {[...images, ...images].map((src, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[200px] h-[140px] sm:w-[300px] sm:h-[200px] md:w-[450px] md:h-[280px] bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            <img src={src} alt="Project" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ProjectWall() {
  return (
    <section className="relative py-12 md:py-16 bg-[#000000] overflow-hidden">
      
      {/* Background Sliders */}
      <div className="opacity-70 md:opacity-90 hover:grayscale-0 transition-all duration-700">
        <MarqueeRow images={projectImages} direction="left" />
        <MarqueeRow images={[...projectImages].reverse()} direction="right" />
      </div>

      {/* Center Pop-up Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="pointer-events-auto bg-white rounded-full w-[280px] h-[280px] md:w-[320px] md:h-[320px] shadow-[0_0_50px_rgba(255,107,44,0.15)] border border-gray-100 flex flex-col items-center justify-center p-6 md:p-8 text-center"
        >
          {/* Logo Placeholder */}
          <div className="relative w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6">
            <Image
              src="/assets/logo.png"
              alt="Company logo"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 leading-tight mb-6 md:mb-8 font-poppins px-2">
            Worked with 30+ Precious Clients
          </h2>

          <Link 
            href="/case-studies" 
            className="bg-orange-600 text-white px-6 py-2.5 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-600/20 whitespace-nowrap"
          >
            See Project Work
          </Link>
        </motion.div>
      </div>

      {/* Decorative Overlay for smooth edge fading */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />
    </section>
  );
}