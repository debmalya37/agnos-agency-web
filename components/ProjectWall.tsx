"use client";

import React from "react";
import { motion } from "framer-motion";

const projectImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=500&q=80",
];

const MarqueeRow = ({ images, direction = "left" }: { images: string[], direction?: "left" | "right" }) => {
  return (
    <div className="flex overflow-hidden select-none gap-6 py-4">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        className="flex flex-nowrap gap-6 min-w-full"
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] h-[200px] md:w-[450px] md:h-[280px] bg-gray-200 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <img src={src} alt="Project" className="w-full h-full object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function ProjectWall() {
  return (
    <section className="relative py-24 bg-[#0B1220] overflow-hidden">
      
      {/* Background Sliders */}
      <div className="opacity-90 hover:grayscale-0 transition-all duration-700">
        <MarqueeRow images={projectImages} direction="left" />
        <MarqueeRow images={[...projectImages].reverse()} direction="right" />
        {/* <MarqueeRow images={projectImages} direction="left" /> */}
      </div>

      {/* Center Pop-up Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="pointer-events-auto bg-white rounded-full w-[280px] h-[280px] md:w-[450px] md:h-[450px] shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Logo Placeholder */}
          <div className="w-10 h-10 md:w-14 md:h-14 bg-orange-500 rounded-xl rotate-45 mb-6 flex items-center justify-center shadow-lg shadow-orange-200">
            <div className="w-4 h-4 bg-white rounded-full -rotate-45" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6 font-mono">
            100+ Premium <br /> Designs
          </h2>

          <button className="bg-orange-500 text-white px-4 py-3 md:px-4 md:py-2 rounded-full font-light text-sm md:text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-100">
            Explore all Projects
          </button>
        </motion.div>
      </div>

      {/* Decorative Overlay for smooth edge fading */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1220] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1220] to-transparent z-10" />
    </section>
  );
}