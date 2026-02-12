"use client";

import React, { useEffect } from "react";
import { BookerEmbed } from "@calcom/atoms";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calUsername: string; // e.g., "john-doe"
  eventSlug: string;   // e.g., "30min"
}

export default function BookingModal({ isOpen, onClose, calUsername, eventSlug }: BookingModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 text-black">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl z-10 border text-black border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full text-black transition-colors"
            >
              <X size={20} />
            </button>

            {/* Cal.com Embed */}
            <div className="w-full h-full overflow-y-auto p-2">
              <BookerEmbed
                namespace="30min"
                calOrigin="https://cal.com"
                eventSlug={eventSlug}
                username={calUsername}
                view="month_view"
                hideEventTypeDetails={false} // Set to true if you want a cleaner look
                layout="column_view" 
                customClassNames={{
                  bookerContainer: "w-full h-full",
                }}
                onCreateBookingSuccess={() => {
                  console.log("Booking created!");
                  // Optional: Close modal after booking or redirect
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}