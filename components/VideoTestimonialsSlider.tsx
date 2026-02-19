"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoData {
  _id: string;
  clientName: string;
  companyName: string;
  shortDescription: string;
  videoId: string;
}

const VideoCard = ({ video }: { video: VideoData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative flex-shrink-0 w-[300px] sm:w-[400px] aspect-[9/16] rounded-[32px] overflow-hidden bg-[#111] shadow-2xl group border border-white/10 snap-center">
      
      {!isPlaying ? (
        <>
          {/* FACADE: High-Res YouTube Thumbnail */}
          <img 
            src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`} 
            alt={video.clientName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradients to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />
          
          {/* Play Button */}
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover:bg-[#FF6B2C] group-hover:border-[#FF6B2C] group-hover:text-black transition-all hover:scale-110"
          >
            <Play className="w-8 h-8 ml-1 fill-current" />
          </button>
        </>
      ) : (
        /* ACTUAL IFRAME: Loaded only on click */
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${video.videoId}&playsinline=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}

      {/* BOTTOM OVERLAY INFO (Stays visible while playing or not) */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <h3 className="text-xl font-bold text-white mb-0.5">{video.clientName}</h3>
        <p className="text-sm font-bold text-[#FF6B2C] mb-2">{video.companyName}</p>
        <p className="text-sm text-gray-300 leading-snug line-clamp-3">{video.shortDescription}</p>
      </div>
    </div>
  );
};

export default function VideoTestimonialsSlider({ videos }: { videos: VideoData[] }) {
  if (!videos || videos.length === 0) return null;

  // --- LAYOUT LOGIC ---
  let alignmentClass = "justify-start"; // Default for 4+ videos (Scrollable everywhere)
  if (videos.length === 1) {
    alignmentClass = "justify-center"; // 1 video: Centered everywhere
  } else if (videos.length <= 3) {
    alignmentClass = "justify-start md:justify-center"; // 2-3 videos: Scrollable on Mobile, Centered on Desktop
  }

  return (
    <div className="w-full">
      {/* We apply the dynamic 'alignmentClass' here. 
        'justify-start' allows horizontal scrolling.
        'justify-center' locks them to the middle.
      */}
      <div className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-6 md:px-0 ${alignmentClass}`}>
        {videos.map((video, index) => (
          <motion.div 
            key={video._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <VideoCard video={video} />
          </motion.div>
        ))}
      </div>
      
      {/* Mobile Swipe Hint (Only show if there's actually something to swipe to) */}
      {videos.length > 1 && (
        <div className="text-center text-xs text-gray-500 uppercase tracking-widest mt-2 md:hidden">
          Swipe to see more
        </div>
      )}
    </div>
  );
}