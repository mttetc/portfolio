import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['your-domain.com'],
    unoptimized: true,
  },
};

export default nextConfig;
