"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, Code, Pencil, Rocket } from "lucide-react";

// The Arcs on the sides
const SideOrbit = ({
  position,
  size,
  yOffset,
  duration,
  icons,
}: {
  position: "left" | "right";
  size: number;
  yOffset: number;
  duration: number;
  icons: {
    Icon: React.ElementType;
    angle: number;
    bg?: string;
  }[];
}) => {
  const gap = 200;      // ✅ larger, even gap
  const stroke = 5;   // ✅ thicker stroke

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        bottom: yOffset,
        [position]: `-${size * 0.72}px`,
      }}
      animate={{
        rotate: position === "left" ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* OUTER LINE */}
      <div
        className="absolute inset-0 rounded-full border border-[#FF6B2C]"
        style={{ borderWidth: stroke }}
      />

      {/* MIDDLE LINE */}
      <div
        className="absolute rounded-full border border-[#FF6B2C]"
        style={{
          inset: gap,
          borderWidth: stroke,
        }}
      />

      {/* INNER LINE */}
      <div
        className="absolute rounded-full border border-[#FF6B2C]"
        style={{
          inset: gap * 2,
          borderWidth: stroke,
        }}
      />

      {/* ICONS ON OUTER LINE ONLY */}
      {icons.map(({ Icon, angle, bg = "bg-white" }, i) => {
        const radius = size / 2;
        const rad = (angle * Math.PI) / 180;

        return (
          <div
            key={i}
            className={`absolute ${bg} rounded-2xl p-4 shadow-2xl border border-gray-100`}
            style={{
              left: "50%",
              top: "50%",
              transform: `
                translate(-50%, -50%)
                translate(${Math.cos(rad) * radius}px,
                          ${Math.sin(rad) * radius}px)
              `,
            }}
          >
            <Icon
              size={22}
              className={bg === "bg-white" ? "text-[#FF6B2C]" : "text-white"}
            />
          </div>
        );
      })}
    </motion.div>
  );
};





export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B1220] pt-20 px-4">
      
      {/* --- Side Arcs with Orbiting Icons --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
       {/* LEFT SIDE */}
<SideOrbit
  position="left"
  size={1700}
  yOffset={-420}
  duration={110}
  icons={[
    { Icon: Palette, angle: 120 },
    { Icon: Code, angle: 155 },
    { Icon: Pencil, angle: 190 },
  ]}
/>


{/* RIGHT SIDE */}
<SideOrbit
  position="right"
  size={1700}
  yOffset={-460}
  duration={110}
  icons={[
    { Icon: Rocket, angle: 310, bg: "bg-black" },
    { Icon: Pencil, angle: 345, bg: "bg-black" },
    { Icon: Code, angle: 20, bg: "bg-black" },
  ]}
/>


      </div>

      {/* --- Hero Content --- */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 bg-white/40 backdrop-blur-sm"
        >
          <span>{">"}</span> DIGITAL AGENCY <span>{"<"}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-[50px] font-black text-[#F3F3F3] leading-[0.9] tracking-tighter mb-8"
        >
          We help businesses make<br />
          <span className="text-[#F3F3F3]">3X more revenue </span>
          <span className="text-[#FF6B2C]">within 3 months</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#666] text-sm md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          We provide complete end to end marketing services right from website development to performance marketing plus personal branding.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="relative group">
            <button className="bg-[#FF6B2C] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#e85a1f] transition-all shadow-xl shadow-orange-900/10 text-lg">
              Discuss your ideas
            </button>
            <span className="absolute -bottom-10 left-0 w-full text-center text-xs italic text-[#FF6B2C] font-semibold animate-pulse">
              Schedule a free call now ↗
            </span>
          </div>
          <button className="bg-[#010101] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#1a1a1a] transition-all text-lg shadow-xl shadow-black/10">
            View services
          </button>
        </motion.div>
      </div>

      {/* --- Footer Logos --- */}
      <div className="mt-32 w-full max-w-5xl z-10 border-t border-dashed border-gray-300 pt-12">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-10 font-bold">
          TRUSTED BY 100+ GLOBAL LEADERS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-40 hover:opacity-100 transition-opacity">
           <span className="text-2xl font-black italic text-[#F3F3F3]">Nexter</span>
           <span className="text-3xl font-light tracking-tighter text-[#F3F3F3]">oslo.</span>
           <span className="text-2xl font-bold tracking-[0.2em] uppercase text-[#F3F3F3]">MONVE</span>
           <span className="text-2xl font-extrabold tracking-tight text-[#F3F3F3]">next</span>
        </div>
      </div>
    </section>
  );
}