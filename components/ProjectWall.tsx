"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projectImages = [
  "https://media.istockphoto.com/id/1409958226/photo/paper-production-machine-in-wastepaper-recycling-factory-paper-and-pulp-mill.jpg?s=612x612&w=0&k=20&c=CeyKPRWuzUHFxjj4hBm6ncXfHEEFH4es8-5ZMad8jbw=",
  "https://pix10.agoda.net/hotelImages/656/65669000/65669000_250206092139330414913019.png",
  "https://www.cyfe.com/wp-content/uploads/2018/02/Screen-Shot-2020-06-03-at-6.44.21-AM-1024x640.png",
  "https://switchsol.co.in/wp-content/uploads/2025/12/KPS-Aluminum-GlasseS.jpg",
  "https://media.licdn.com/dms/image/v2/D5622AQHS2oo2Mrm9Dg/feedshare-shrink_800/B56ZxGeYSJGYAg-/0/1770708895221?e=2147483647&v=beta&t=6ehh8mJR7CylJM5OSGIbD0P5QBuB4pbptCoFXY7gFT0",
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
    <section className="relative py-16 bg-[#000000] overflow-hidden">
      
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
          className="pointer-events-auto bg-white rounded-full w-[140px] h-[140px] md:w-[300px] md:h-[300px] shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Logo Placeholder */}
          <div className="relative w-10 h-10 md:w-14 md:h-14 mb-6">
  <Image
    src="/assets/logo.png"
    alt="Company logo"
    fill
    className="object-contain drop-shadow-xl"
    priority
  />
</div>

          <h2 className="text-3xl md:text-3xl font-medium text-gray-900 leading-tight mb-6 font-poppins">
            Worked with 30+ Precious Clients
          </h2>

          <Link href="/case-studies" className="bg-orange-600 text-white px-4 py-3 md:px-4 md:py-2 rounded-full font-light text-sm md:text-[16px] hover:bg-orange-600 transition-all shadow-xl shadow-orange-100">
            See Project Work
          </Link>
        </motion.div>
      </div>

      {/* Decorative Overlay for smooth edge fading */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B1220] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B1220] to-transparent z-10" />
    </section>
  );
}