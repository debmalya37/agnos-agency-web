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

const introLines = [
  "We know choosing the right partner",
  "is hard because few truly deliver",
  "and create positive impact.",
  "So we made it",
  "to compare",
  "how we work",
  "versus what you usually",
  "get in the market.",
];

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-black px-4 font-poppins font-medium">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* ---------- SCROLL REVEAL HEADER ---------- */}
        {/* ---------- SCROLL REVEAL HEADER (UI PRESERVED) ---------- */}
<div className="text-center max-w-4xl mb-20">

  {/* Block 1 */}
  <motion.h2
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-2xl md:text-3xl font-medium text-[#F3F3F3] leading-[1.25] mb-10"
  >
    We know choosing the right partner <br />
    is hard because few{" "}
    <span className="text-[#FF6B2C]">
      truly deliver and create positive impact.
    </span>
  </motion.h2>

  {/* Block 2 */}
  <motion.p
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
    className="text-2xl md:text-3xl font-medium text-[#F3F3F3] mb-4"
  >
    So we made it{" "}
    <span className="text-[#FF6B2C]">to compare</span>{" "}
    how we work
  </motion.p>

  {/* Toggle Row */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    className="flex items-center justify-center gap-3 mb-4"
  >
    <div className="w-14 h-7 bg-[#FF6B2C] rounded-full relative flex items-center px-1">
      <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
    </div>
    <span className="text-2xl md:text-3xl font-medium text-[#F3F3F3]">
      versus what you usually
    </span>
  </motion.div>

  {/* Block 4 */}
  <motion.p
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
    className="text-2xl md:text-3xl font-medium"
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
          <div className="w-full md:w-[480px] bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-medium text-[#111] mb-10">
              Other Marketing Companies
            </h3>

            <ul>
              {otherAgencies.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-4 py-5 text-[#999] font-medium
                  ${idx !== otherAgencies.length - 1
                    ? "border-b border-dotted border-gray-200"
                    : ""}`}
                >
                  <div className="w-5 min-w-[20px] flex justify-center pt-1">
  <ChevronRight size={18} className="text-[#CCC]" />
</div>

                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-[560px] bg-[#FF9E58] rounded-[2.5rem] p-12 shadow-2xl md:-ml-14 z-20 mt-6 md:mt-0"
          >
            <h3 className="text-2xl font-medium text-[#111] mb-10">
              Aitek Media
            </h3>

            <ul>
              {agnosBenefits.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-4 py-5 text-[#111] font-medium
                  ${idx !== agnosBenefits.length - 1
                    ? "border-b border-dotted border-[#e08b4d]"
                    : ""}`}
                >
                  <div className="w-5 min-w-[20px] flex justify-center pt-1">
  <ChevronRight size={18} className="text-[#111]" />
</div>

                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------- FOOTER CTA ---------- */}
        <div className="mt-20 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/case-studies" className="bg-[#FF6B2C] text-white px-10 py-4 rounded-2xl font-medium text-lg hover:bg-[#e85a1f] transition-all shadow-xl">
            Know our story
          </Link>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[11, 12, 13].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/100?img=${id}`}
                  className="w-12 h-12 rounded-full border-4 border-[#F3F3F3]"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-[#F3F3F3] bg-white flex items-center justify-center text-xs font-medium text-gray-400">
                +52
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FF6B2C] text-[#FF6B2C]" />
                ))}
                <span className="text-sm font-black ml-2 text-[#111]">4.5/5</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Trusted by <span className="text-[#FF6B2C] font-semibold">25+</span> brands
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
