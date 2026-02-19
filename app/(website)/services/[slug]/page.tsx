"use client";

import React, { useRef, useEffect, use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, X, PlayCircle, ArrowRight, Minus, Plus } from "lucide-react";
import { SERVICES_DATA } from "@/lib/servicesData";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import PlansSection from "@/components/PlansSection";
import VideoTestimonialsSlider from "@/components/VideoTestimonialsSlider"; // Added Import
import { getCalApi } from "@calcom/embed-react";
import Link from "next/link";

// --- CONFIGURATION ---
const CAL_NAMESPACE = "30min"; 
const CAL_LINK = "aitekmedia/30min"; 

// --- ANIMATION CONSTANTS ---
// "Luxury" Easing for smooth UI (similar to iOS/macOS)
const EASING = [0.25, 0.1, 0.25, 1.0]; 

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: EASING }
  }
};

// --- COMPONENT: HERO TITLE REVEAL ---
const TitleReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  
  const wordAnim: Variants = {
    hidden: { y: "120%", rotate: 2, opacity: 0 },
    visible: { 
      y: 0, 
      rotate: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: EASING }
    }
  };

  return (
    <motion.h1 
      className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="relative overflow-hidden inline-block -mb-2 pb-2 px-1">
          <motion.span variants={wordAnim} className="inline-block origin-bottom-left will-change-transform">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

// --- COMPONENT: STYLISH FAQ SECTION ---
const FAQSection = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <ScrollReveal className="mb-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C] mb-4">Support</p>
        <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
          Questions? We&apos;ve got answers.
        </h2>
      </ScrollReveal>
      
      {/* FAQ Grid */}
      <div className="grid gap-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <ScrollReveal key={i} delay={i * 0.05} className="w-full">
              <motion.div 
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`group relative w-full cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-500 ease-out
                  ${isOpen 
                    ? "bg-[#141414] border-[#FF6B2C]/40 shadow-[0_0_30px_-10px_rgba(255,107,44,0.15)]" 
                    : "bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-[#111]"
                  }
                `}
              >
                {/* Active Indicator Line */}
                <motion.div 
                  initial={false}
                  animate={{ height: isOpen ? "100%" : "0%" }}
                  className="absolute left-0 top-0 w-1 bg-[#FF6B2C]"
                />

                <div className="flex items-center justify-between gap-6 px-6 py-6 sm:px-8">
                  <h3 className={`text-lg font-medium leading-snug transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                    {faq.question}
                  </h3>
                  
                  {/* Animated Icon */}
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? "bg-[#FF6B2C] border-[#FF6B2C] text-black rotate-180 scale-110" 
                      : "border-white/10 bg-white/5 text-gray-400 group-hover:border-white/30 group-hover:text-white"
                  }`}>
                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} />}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-8 sm:px-8 pt-0">
                        <p className="text-base leading-relaxed text-gray-400 max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

// --- COMPONENT: SMOOTH SCROLL WRAPPER ---
const ScrollReveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASING, delay }}
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ---------------- MAIN PAGE COMPONENT ---------------- //

export default function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = SERVICES_DATA[slug];

  // --- STATE FOR DB FETCHED VIDEOS ---
  const [videos, setVideos] = useState([]);

  // --- DATA FETCHING & CAL.COM INITIALIZATION ---
  useEffect(() => {
    // 1. Init Cal.com
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        theme: "dark"
      });
    })();

    // 2. Fetch Video Testimonials from Database API
    async function loadVideos() {
      try {
        const res = await fetch("/api/admin/video-testimonials");
        if (res.ok) {
          const data = await res.json();
          // Optional: filter only published if your API doesn't already
          const publishedVideos = data.filter((v: any) => v.status === "published");
          setVideos(publishedVideos);
        }
      } catch (error) {
        console.error("Failed to load video testimonials:", error);
      }
    }
    loadVideos();
  }, []);

  const handleBooking = async () => {
    const cal = await getCalApi({ namespace: CAL_NAMESPACE });
    cal("modal", {
        calLink: CAL_LINK,
        config: { layout: "month_view", theme: "dark" }
    });
  };

  if (!service) notFound();

  // Parallax Setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]); 
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]); 

  const sectionPadding = "px-6 py-12  relative z-10";
  const container = "mx-auto max-w-6xl";
  const surface = "rounded-[28px] border border-white/10 bg-[#141414] shadow-xl hover:border-white/20 transition-colors duration-500 will-change-transform";
    const video2Testimonials = [
    { name: "Mr. Ejaas Ellias", link: "https://thestaybnb.com/", role: "Marketing Head, Staybnb", summary: "Build brand credibility & search traffic ", image: service.showcase.images[0] },
    { name: "Mr. Debayan Sen", link: "https://avinia.com/", role: "MD, Avinia", summary: "Online Visibility Foundation Revamp", image: service.showcase.images[1] },
    { name: "Mr. Prabhat Tiwari", link: "https://switchsol.co.in/", role: "Director, Switchsol", summary: "Lead Generation Business Website", image: service.painPoint.image },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-[#FF6B2C] selection:text-white overflow-hidden">
      
      {/* ---------------- SECTION 1: HERO ---------------- */}
      <section className="relative px-6 pb-20 pt-32 lg:pt-44">
        {/* Parallax Background Elements */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10 pointer-events-none opacity-60 mix-blend-screen">
          <div className="absolute -top-32 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#FF6B2C]/10 blur-[180px]" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute inset-0 -z-10 pointer-events-none opacity-50">
          <div className="absolute top-1/4 right-[-200px] h-[500px] w-[500px] rounded-full bg-[#FF9A5C]/5 blur-[160px]" />
        </motion.div>

        <div className={`${container} grid w-full items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]`}>
          <div className="text-center lg:text-left">
            
            {/* Trusted Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASING }}
            >
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/30 bg-[#1A1A1A]/80 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF9A5C] shadow-lg shadow-[#FF6B2C]/10">
                Trusted Service Partner
              </p>
            </motion.div>
            
            {/* Animated H1 */}
            <TitleReveal 
              text={service.hero.headline} 
              className="text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-5xl justify-center lg:justify-start" 
            />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="mt-8 text-lg leading-relaxed text-gray-300 sm:text-xl max-w-2xl mx-auto lg:mx-0"
            >
              {service.hero.subheadline}
            </motion.p>

            {/* Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASING }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              <button 
                data-cal-namespace={CAL_NAMESPACE}
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view","theme":"dark"}'
                onClick={handleBooking}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#FF9152] px-10 py-4 text-base font-bold text-black shadow-[0_0_40px_-10px_rgba(255,107,44,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(255,107,44,0.6)]"
              >
                <span className="relative z-10">{service.hero.cta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <Link href="/case-studies"  className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 transition-all hover:border-[#FF6B2C]/40 hover:bg-white/10 hover:text-white flex items-center gap-2 justify-center">
                View Success Stories
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </motion.div>

            {/* Trust Tags */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-medium lg:justify-start"
            >
              {["Confidential & NDA-ready", "Senior specialists only", service.hero.trustText].map((tag, i) => (
                <span key={i} className="rounded-full border border-white/5 bg-white/5 px-4 py-2 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 100, rotate: 5, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#141414]/80 backdrop-blur-xl p-5 shadow-2xl transition-transform hover:scale-[1.01] duration-700">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
                <Image 
                  src={service.showcase.images[0]} 
                  alt="Service preview" 
                  fill 
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Engagement</p>
                  <p className="text-lg font-bold text-white">Strategic + Execution</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SECTION 2: SHOWCASE ---------------- */}
      <section className={`${sectionPadding} bg-[#0E0E0E]`}>
        <div className={container}>
          <ScrollReveal className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl tracking-tight">
              {service.showcase.title}
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">{service.showcase.subtitle}</p>
          </ScrollReveal>

          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            
            {/* Features List */}
            <ScrollReveal className={`${surface} p-10 text-left relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C]">Positioning</p>
              <h3 className="mt-6 text-3xl font-medium text-white">Make your brand feel inevitable.</h3>
              <p className="mt-4 text-base text-gray-300 leading-relaxed">
                We craft experiences that earn attention, signal credibility, and drive action across every channel.
              </p>
              
              <div className="mt-8 space-y-4 text-sm text-gray-300">
                {["Executive-grade creative direction", "Conversion-first layouts and messaging", "Consistent, premium visual systems"].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9A5C]/20 text-[#FF9A5C]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { val: "24/7", lbl: "Response" },
                  { val: "30+", lbl: "Launches" }
                ].map((stat) => (
                  <div key={stat.lbl} className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-center">
                    <p className="text-2xl font-bold text-white">{stat.val}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{stat.lbl}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Images Grid */}
            <div className="grid gap-6">
              <ScrollReveal delay={0.2} className="relative h-[280px] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl sm:h-[340px]">
                <Image src={service.showcase.images[0]} alt="Showcase 1" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </ScrollReveal>
              
              <div className="grid grid-cols-[1.2fr_0.8fr] gap-6">
                <ScrollReveal delay={0.3} className="relative h-[200px] overflow-hidden rounded-[28px] border border-white/10 shadow-xl">
                  <Image src={service.showcase.images[1]} alt="Showcase 2" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                </ScrollReveal>
                <ScrollReveal delay={0.4} className="rounded-[28px] border border-[#FF6B2C]/20 bg-[#141414] p-6 flex flex-col justify-center">
                  <p className="text-3xl font-bold text-white">+240%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF9A5C] mt-2">Conversion Lift</p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={sectionPadding}>
        <div className={container}>
          <ScrollReveal className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C]">Client Proof</p>
            <h2 className="mt-6 text-3xl font-medium text-white sm:text-4xl lg:text-5xl">Results That Build Trust</h2>
          </ScrollReveal>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="grid gap-8 lg:grid-cols-3"
          >
            {video2Testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} variants={itemVariants} className={`${surface} overflow-hidden group cursor-pointer`}>
                <Link href={testimonial.link} target="_blank" rel="noopener noreferrer">
                <div className="relative h-[240px] overflow-hidden">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.1 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl transition-all group-hover:bg-[#FF6B2C] group-hover:border-[#FF6B2C] group-hover:text-black">
                      <PlayCircle className="h-8 w-8 ml-1 fill-current" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400 font-medium">{testimonial.role}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm font-bold text-[#FF9A5C] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF9A5C]" />
                      {testimonial.summary}
                    </p>
                  </div>
                </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- SECTION 3: VIDEO TESTIMONIALS (YOUTUBE SHORTS) ---------------- */}
      {videos.length > 0 && (
        <section className={sectionPadding}>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C] mb-4">Client Proof</p>
              <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">Hear It From Them</h2>
            </ScrollReveal>

            {/* Embed the highly optimized Facade Slider */}
            <VideoTestimonialsSlider videos={videos} />
          </div>
        </section>
      )}

      {/* ---------------- SECTION 4: PAIN POINT COMPARISON ---------------- */}
      <section className={sectionPadding}>
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <ScrollReveal className="rounded-[40px] border border-white/10 bg-[#121212] p-10 shadow-2xl sm:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FF6B2C]/5 blur-[100px] rounded-full pointer-events-none" />
              
              <h2 className="text-2xl font-medium text-white sm:text-3xl relative z-10">{service.painPoint.title}</h2>
              <ul className="mt-10 space-y-6 relative z-10">
                {service.painPoint.points.map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-gray-300">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-lg font-light">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center relative z-10">
                <p className="text-sm text-gray-500 font-medium">Ready to fix this?</p>
                <button 
                  data-cal-namespace={CAL_NAMESPACE}
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view","theme":"dark"}'
                  onClick={handleBooking}
                  className="rounded-full bg-[#FF6B2C] px-8 py-3 text-sm font-bold text-black transition hover:bg-[#ff8145] hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  Book a Strategy Call
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative h-[400px] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl sm:h-[520px]">
              <Image src={service.painPoint.image} alt="Pain Point Visual" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 max-w-xs">
                <p className="text-3xl font-medium text-white">Stop guessing.</p>
                <p className="text-gray-400 mt-2">Data-backed decisions always win.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: WHAT'S INCLUDED (PROCESS TIMELINE) ---------------- */}
      <section className={`px-6 py-24 z-10 bg-[#0E0E0E] relative overflow-hidden`}>
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#FF6B2C]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className={container}>
          <ScrollReveal className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl tracking-tight">Our Effective Work Process</h2>
            <p className="mt-6 text-lg text-gray-400">Expert-led project management and a performance-built framework.</p>
          </ScrollReveal>

          <div className="relative">
            {/* Desktop Connecting Line 
              This dashed line runs horizontally behind the cards on md+ screens 
            */}
            <div className="absolute top-8 left-0 w-full hidden md:block border-t-2 border-dashed border-white/10 z-0" />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={containerVariants}
              className="grid gap-12 md:gap-6 md:grid-cols-3 lg:grid-cols-5 relative z-10"
            >
              {service.features.map((feature: any, i: number) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Step Number / Icon Badge */}
                  <div className="flex justify-center md:justify-start mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#141414] border border-white/10 text-[#FF9A5C] shadow-xl font-bold text-xl transition-transform duration-500 group-hover:scale-110 group-hover:border-[#FF6B2C]/40 group-hover:bg-[#FF6B2C]/10">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={`${surface} p-8 text-center md:text-left h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(255,107,44,0.1)]`}>
                    <h3 className="text-xl font-medium text-white mb-4">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{feature.desc}</p>
                  </div>

                  {/* Mobile Connecting Line (Vertical) */}
                  {i !== service.features.length - 1 && (
                     <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 h-6 border-l-2 border-dashed border-white/10 md:hidden" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <PlansSection />
      
      {/* ---------------- SECTION 6: WHOM THIS IS FOR ---------------- */}
      <section className='px-6 py-24  relative z-10'>
        <div className={container}>
          <ScrollReveal className="mb-16 text-center">
            <h2 className="text-3xl font-medium text-white sm:text-4xl">Whom This Is For</h2>
            <p className="mt-4 text-gray-400">A focused engagement designed for teams ready to scale.</p>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <ScrollReveal className={`${surface} p-10 border-green-500/20 bg-green-900/5`}>
              <h3 className="text-xl font-medium text-white flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-black">
                  <Check size={16} strokeWidth={3} />
                </span>
                This is <span className="text-green-400 italic">For You</span> if...
              </h3>
              <ul className="mt-8 space-y-5">
                {service.audience.forYou.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-gray-300">
                    <Check className="mt-1 h-4 w-4 text-green-500 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="rounded-[28px] border border-white/5 bg-[#0F0F0F] p-10 opacity-70 hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-medium text-gray-400 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <X size={16} strokeWidth={3} />
                </span>
                This is <span className="text-[#FF6B2C] italic">Not For You</span> if...
              </h3>
              <ul className="mt-8 space-y-5">
                {service.audience.notForYou.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-gray-500">
                    <X className="mt-1 h-4 w-4 text-white/20 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 7: FAQ ---------------- */}
      {service.faqs && (
        <section className={`${sectionPadding} relative`}>
          {/* Subtle Background Glow for FAQ Section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B2C]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className={container}>
            <FAQSection faqs={service.faqs} />
          </div>
        </section>
      )}
    </main>
  );
}