/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  modularizeImports: {
    'react-icons/fi': {
      transform: 'react-icons/fi/{{member}}',
    },
    'react-icons/si': {
      transform: 'react-icons/si/{{member}}',
    },
  },
};

// Only use bundle analyzer when analyzing
const config =
  process.env.ANALYZE === 'true' ? require('@next/bundle-analyzer')()(nextConfig) : nextConfig;

module.exports = config;
