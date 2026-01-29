"use client";

import Image from "next/image";

/* ---------------- FEATURED PROJECT ---------------- */

function FeaturedProject({
  title,
  industry,
  scope,
  description,
  image,
}: any) {
  return (
    <div className="bg-white rounded-[28px] shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6">
      
      {/* CARD */}
      <div className="flex-1 flex flex-col min-h-[420px]">
        
        {/* TOP BLOCK */}
        <div>
          <h3 className="text-2xl font-semibold text-[#0B1220]">
            {title}
          </h3>

          <p className="mt-4 text-sm text-gray-500">
            <strong className="text-gray-700">Industry:</strong> {industry}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            <strong className="text-gray-700">Scope:</strong> {scope}
          </p>
        </div>

        {/* FLEX SPACER — creates the big gap */}
        <div className="flex-1" />

        {/* BOTTOM BLOCK */}
        <div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            {description}
          </p>

          <button className="mt-6 w-fit bg-[#FF6B2C] text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow">
            View project detail
          </button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative w-full md:w-[45%] aspect-[4/5] rounded-[22px] overflow-hidden bg-[#E5E3DF]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}


/* ---------------- SECONDARY PROJECT ---------------- */

function SecondaryProject({
  title,
  industry,
  scope,
  description,
}: any) {
  return (
    <div className="rounded-[28px] bg-white p-6 md:p-8 opacity-40 flex flex-col min-h-[420px]">
      
      {/* TOP */}
      <div>
        <h3 className="text-xl font-semibold text-[#0B1220]">
          {title}
        </h3>

        <p className="mt-4 text-sm text-gray-500">
          <strong className="text-gray-700">Industry:</strong> {industry}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          <strong className="text-gray-700">Scope:</strong> {scope}
        </p>
      </div>

      {/* SPACER */}
      <div className="flex-1" />

      {/* BOTTOM */}
      <div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        <button className="mt-6 w-fit bg-[#FF6B2C]/40 text-white text-sm font-medium px-5 py-2.5 rounded-lg">
          View project detail
        </button>
      </div>
    </div>
  );
}


/* ---------------- MAIN COMPONENT ---------------- */

export default function FeaturedProjects() {
  return (
    <section className="bg-[#0B1220] py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.35em] uppercase text-gray-400 font-semibold">
            ◁ FEATURED PROJECTS ▷
          </span>

          <h2 className="mt-4 text-[42px] md:text-[56px] leading-tight font-semibold text-[#F3F3F3]">
            We helped them 3x <br />their revenue
          </h2>

          <p className="mt-3 text-sm text-[#FF6B2C] italic">
            Where ideas take shape
          </p>
        </div>

        {/* Projects Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">

          <FeaturedProject
            title="Haven Living"
            industry="Home & Lifestyle"
            scope="Brand Direction + Visual System"
            description="Created a warm, lifestyle-driven digital presence that highlights interior quality, storytelling, and modern aesthetics."
            image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800"
          />

          <SecondaryProject
            title="Orion Fitness"
            industry="Health & Wellness"
            scope="Brand Identity + Mobile App UI"
            description="Designed a motivating mobile experience with clearer progress tracking, smoother usability, and stronger daily engagement."
          />

        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="w-2 h-2 rounded-full bg-gray-800" />
          <span className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
}
