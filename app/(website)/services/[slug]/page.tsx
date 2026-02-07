"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, X, PlayCircle, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/servicesData"; // Adjust path as needed
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import PlansSection from "@/components/PlansSection";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- REUSABLE ANIMATED SECTION WRAPPER ---
const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// 2. The Main Page Component
export default function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const service = SERVICES_DATA[params.slug];

  // Handle invalid slugs
  if (!service) {
    notFound();
  }

  // Parallax Scroll Hooks
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Slow background move
  const y2 = useTransform(scrollY, [0, 500], [0, -150]); // Reverse move

  const sectionPadding = "px-6 py-20 relative z-10";
  const container = "mx-auto max-w-6xl";
  const surface = "rounded-[28px] border border-white/10 bg-[#141414] shadow-xl hover:border-white/20 transition-colors duration-500";

  const videoTestimonials = [
    {
      name: "Aarav Malhotra",
      role: "CEO, FinEdge",
      summary: "Revenue lift in 90 days",
      image: service.showcase.images[0],
    },
    {
      name: "Riya Kapoor",
      role: "VP Growth, NovaPay",
      summary: "Pipeline velocity +38%",
      image: service.showcase.images[1],
    },
    {
      name: "Daniel Moore",
      role: "Founder, Calibrate",
      summary: "Launch quality at scale",
      image: service.painPoint.image,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] font-sans text-white selection:bg-[#FF6B2C] selection:text-white overflow-hidden">
      
      {/* ---------------- SECTION 1: HERO ---------------- */}
      <section className="relative px-6 pb-16 pt-32 lg:pt-40">
        {/* Animated Background Blobs */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF6B2C]/15 blur-[160px] opacity-80" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 right-[-100px] h-[400px] w-[400px] rounded-full bg-[#FF9A5C]/10 blur-[140px]" />
        </motion.div>

        <div className={`${container} grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]`}>
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/40 bg-[#1A1A1A]/80 backdrop-blur-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FF9A5C]">
                Trusted Service Partner
              </p>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              {service.hero.headline}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="mt-8 text-lg leading-relaxed text-gray-300 sm:text-xl max-w-2xl mx-auto lg:mx-0">
              {service.hero.subheadline}
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#FF9152] px-10 py-4 text-base font-medium text-black shadow-2xl shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/40">
                <span className="relative z-10">{service.hero.cta}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 transition-all hover:border-[#FF6B2C]/60 hover:bg-white/10 hover:text-white flex items-center gap-2 justify-center">
                View Success Stories
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-medium lg:justify-start">
              {["Confidential & NDA-ready", "Senior specialists only", service.hero.trustText].map((tag, i) => (
                <span key={i} className="rounded-full border border-white/5 bg-white/5 px-4 py-2 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image / Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#141414]/80 backdrop-blur-xl p-5 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
                <Image 
                  src={service.showcase.images[0]} 
                  alt="Service preview" 
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </div>
              <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Engagement</p>
                  <p className="text-lg font-bold text-white">Strategic + Execution</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#FF6B2C] px-4 py-2 text-xs font-bold text-black shadow-lg shadow-orange-500/20">
                  <PlayCircle className="h-4 w-4" />
                  Proof
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SECTION 2: SHOWCASE ---------------- */}
      <AnimatedSection className={`${sectionPadding} bg-[#0E0E0E]`}>
        <div className={container}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl tracking-tight">
              {service.showcase.title}
            </h2>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">{service.showcase.subtitle}</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            
            {/* Features List */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`${surface} p-10 text-left relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C]">Positioning</p>
              <h3 className="mt-6 text-3xl font-medium text-white">Make your brand feel inevitable.</h3>
              <p className="mt-4 text-base text-gray-300 leading-relaxed">
                We craft experiences that earn attention, signal credibility, and drive action across every channel.
              </p>
              
              <div className="mt-8 space-y-4 text-sm text-gray-300">
                {[
                  "Executive-grade creative direction",
                  "Conversion-first layouts and messaging",
                  "Consistent, premium visual systems",
                ].map((item) => (
                  <motion.div variants={fadeInUp} key={item} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9A5C]/20 text-[#FF9A5C]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-center">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Response</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-center">
                  <p className="text-2xl font-bold text-white">30+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Launches</p>
                </div>
              </div>
            </motion.div>

            {/* Images Grid */}
            <div className="grid gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative h-[280px] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl sm:h-[340px]"
              >
                <Image src={service.showcase.images[0]} alt="Showcase 1" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>
              
              <div className="grid grid-cols-[1.2fr_0.8fr] gap-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-[200px] overflow-hidden rounded-[28px] border border-white/10 shadow-xl"
                >
                  <Image src={service.showcase.images[1]} alt="Showcase 2" fill className="object-cover" />
                </motion.div>
                <div className="rounded-[28px] border border-[#FF6B2C]/20 bg-[#141414] p-6 flex flex-col justify-center">
                  <p className="text-3xl font-bold text-white">+240%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FF9A5C] mt-2">Conversion Lift</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ---------------- SECTION 3: TESTIMONIALS ---------------- */}
      <AnimatedSection className={sectionPadding}>
        <div className={container}>
          <div className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF9A5C]">Client Proof</p>
            <h2 className="mt-6 text-3xl font-medium text-white sm:text-4xl lg:text-5xl">Results That Build Trust</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {videoTestimonials.map((testimonial, i) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`${surface} overflow-hidden group cursor-pointer`}
              >
                <div className="relative h-[240px] overflow-hidden">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-2xl transition-all group-hover:bg-[#FF6B2C] group-hover:border-[#FF6B2C] group-hover:text-black"
                    >
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
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ---------------- SECTION 4: PAIN POINT COMPARISON ---------------- */}
      <AnimatedSection className={sectionPadding}>
        <div className={container}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="rounded-[40px] border border-white/10 bg-[#121212] p-10 shadow-2xl sm:p-14 relative overflow-hidden">
              {/* Subtle background gradient */}
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
                <button className="rounded-full bg-[#FF6B2C] px-8 py-3 text-sm font-bold text-black transition hover:bg-[#ff8145] hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20">
                  Book a Private Consultation
                </button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] overflow-hidden rounded-[40px] border border-white/10 shadow-2xl sm:h-[520px]"
            >
              <Image src={service.painPoint.image} alt="Pain Point Visual" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 max-w-xs">
                <p className="text-3xl font-medium text-white">Stop guessing.</p>
                <p className="text-gray-400 mt-2">Data-backed decisions always win.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ---------------- SECTION 5: WHAT'S INCLUDED ---------------- */}
      <section className={`${sectionPadding} bg-[#0E0E0E]`}>
        <div className={container}>
          <AnimatedSection className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">What&apos;s Included</h2>
            <p className="mt-6 text-lg text-gray-400">A senior-led, end-to-end delivery framework built for performance.</p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3">
            {service.features.map((feature: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`${surface} p-10 text-left hover:-translate-y-2 transition-transform duration-300`}
              >
                <span className="inline-block rounded-lg bg-[#FF6B2C]/10 p-3 text-[#FF6B2C] mb-6">
                  {i === 0 ? <Check size={24} /> : i === 1 ? <ArrowRight size={24} /> : <PlayCircle size={24} />}
                </span>
                <h3 className="text-2xl font-medium text-white">{feature.title}</h3>
                <div className="my-6 h-px w-full bg-white/10" />
                <p className="text-base leading-relaxed text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<PlansSection />
      {/* ---------------- SECTION 6: WHOM THIS IS FOR ---------------- */}
      <AnimatedSection className={sectionPadding}>
        <div className={container}>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-medium text-white sm:text-4xl">Whom This Is For</h2>
            <p className="mt-4 text-gray-400">A focused engagement designed for teams ready to scale.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Positive Fit */}
            <div className={`${surface} p-10 border-green-500/20 bg-green-900/5`}>
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
            </div>

            {/* Negative Fit */}
            <div className="rounded-[28px] border border-white/5 bg-[#0F0F0F] p-10 opacity-70 hover:opacity-100 transition-opacity">
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
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 flex flex-col items-center gap-6 rounded-[40px] border border-white/10 bg-gradient-to-b from-[#1A1A1A] to-black px-8 py-16 text-center shadow-2xl overflow-hidden relative"
          >
            {/* CTA Background Effects */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-[#FF6B2C]/10 to-transparent pointer-events-none" />

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#FF9A5C] relative z-10">Next Steps</p>
            <h3 className="text-4xl md:text-5xl font-medium text-white relative z-10 max-w-2xl leading-tight">
              Ready to move with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">confidence?</span>
            </h3>
            <div className="mt-4 relative z-10">
              <button className="group relative rounded-full bg-[#FF6B2C] px-12 py-5 text-lg font-bold text-black shadow-2xl shadow-orange-500/30 transition-all hover:scale-[1.03] hover:bg-[#ff8145]">
                {service.hero.cta}
                <div className="absolute inset-0 bg-[#13131370] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500 relative z-10">Limited spots available for Q1 2026</p>
          </motion.div>
        </div>
      </AnimatedSection>

      
    </main>
  );
}