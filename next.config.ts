import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['https//localhost:3000'],
    unoptimized: true,
  },
};

export default nextConfig;
