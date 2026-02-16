"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/assets/logo.png"
              alt="Aitek logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="text-xl font-medium tracking-tight text-gray-900">Aitek</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/services/web-development" className="hover:text-black transition-colors">
            Services
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
          <Link href="/case-studies" className="hover:text-black transition-colors">
            Case Studies
          </Link>
          <Link
            href="/contact"
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            Book a Strategy Call
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-xl animate-in fade-in zoom-in duration-200">
          <Link href="/services/web-development" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link
            href="/get-started"
            className="bg-black text-white text-center py-3 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            Book a Strategy Call
          </Link>
        </div>
      )}
    </nav>
  );
}
