"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const otherAgencies = [
  "Slow, unclear timelines",
  "No clear process",
  "Focusing only on lead generation and vanity metrics",
  "Team of generalists working on projects",
  "No proper training & support post project handover is done.",
  "Applying the same copy paste template & strategies to each business with no data analysis.",
];

const agnosBenefits = [
  "Clear daily communications with weekly updates",
  "Documented standard operating procedure & workflows aligned with clear milestone",
  "Clear focus on brand building and positive revenue growth ",
  "Subject matter professionals along with project heads working alongside clients",
  "Dedicated project handover training for further application of work done.",
  "Blending creativity with latest technologies for a truly innovative approach to create bespoke solutions tailored to each business requirement.",
];

export default function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 bg-black px-4 font-poppins font-medium overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* ---------- SCROLL REVEAL HEADER ---------- */}
        <div className="text-center max-w-4xl mb-16 md:mb-24 px-2">
          {/* Block 1 */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F3F3F3] leading-[1.4] md:leading-[1.25] mb-8 md:mb-10"
          >
            We know choosing the right partner <br className="hidden sm:block" />
            is hard because few{" "}
            <span className="text-[#FF6B2C]">
              truly deliver and create positive impact.
            </span>
          </motion.h2>

          {/* Block 2 */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F3F3F3] mb-4"
          >
            So we made it{" "}
            <span className="text-[#FF6B2C]">to compare</span>{" "}
            how we work
          </motion.p>

          {/* Toggle Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-6 md:w-14 md:h-7 bg-[#FF6B2C] rounded-full relative flex items-center px-1 shrink-0">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-[#F3F3F3]">
              versus what you usually
            </span>
          </motion.div>

          {/* Block 4 */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-medium"
          >
            get{" "}
            <span className="text-[#FF6B2C]">
              in the market.
            </span>
          </motion.p>
        </div>


        {/* ---------- COMPARISON CARDS ---------- */}
        <div className="relative w-full max-w-[1200px] flex flex-col md:flex-row justify-center items-stretch">

          {/* LEFT CARD */}
          <div className="w-full md:w-[480px] bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 z-10">
            <h3 className="text-xl md:text-2xl font-medium text-[#111] mb-8 md:mb-10 text-center md:text-left">
              Other Marketing Companies
            </h3>

            <ul>
              {otherAgencies.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 md:gap-4 py-4 md:py-5 text-[#999] font-medium text-sm md:text-base
                  ${idx !== otherAgencies.length - 1
                    ? "border-b border-dotted border-gray-200"
                    : ""}`}
                >
                  <div className="w-5 min-w-[20px] flex justify-center pt-0.5 md:pt-1">
                    <ChevronRight size={18} className="text-[#CCC]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CARD */}
          {/* Mobile: -mt-6 to overlap vertically | Desktop: -ml-14 to overlap horizontally */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-[560px] bg-[#FF9E58] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl -mt-6 md:mt-0 md:-ml-14 z-20"
          >
            <h3 className="text-xl md:text-2xl font-medium text-[#111] mb-8 md:mb-10 text-center md:text-left">
              Aitek Media
            </h3>

            <ul>
              {agnosBenefits.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 md:gap-4 py-4 md:py-5 text-[#111] font-medium text-sm md:text-base
                  ${idx !== agnosBenefits.length - 1
                    ? "border-b border-dotted border-[#e08b4d]"
                    : ""}`}
                >
                  <div className="w-5 min-w-[20px] flex justify-center pt-0.5 md:pt-1">
                    <ChevronRight size={18} className="text-[#111]" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------- FOOTER CTA ---------- */}
        <div className="mt-16 md:mt-24 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 px-4 md:px-0">
          <Link 
            href="/case-studies" 
            className="w-full md:w-auto text-center bg-[#FF6B2C] text-white px-10 py-4 rounded-2xl font-medium text-lg hover:bg-[#e85a1f] transition-all shadow-xl active:scale-95"
          >
            Know our story
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {[11, 12, 13].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/100?img=${id}`}
                  alt="Client avatar"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-[#111]"
                />
              ))}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-[#111] bg-white flex items-center justify-center text-[10px] md:text-xs font-medium text-gray-500">
                +52
              </div>
            </div>

            {/* Rating */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FF6B2C] text-[#FF6B2C]" />
                ))}
                {/* Fixed text color to show up on black background */}
                <span className="text-sm font-black ml-2 text-white">4.5/5</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Trusted by <span className="text-[#FF6B2C] font-semibold">25+</span> brands
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}