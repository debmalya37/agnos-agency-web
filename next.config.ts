import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "media.istockphoto.com"],
  },
  // Add this block to ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // (Optional) If you also want to ignore TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
