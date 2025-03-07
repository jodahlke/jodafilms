/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image optimization (with unoptimized for static export)
  images: {
    unoptimized: true, // Required for static export
    domains: [],
  },
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: false, // Turn off strict mode for performance
  // Static export configuration
  output: 'export',
  distDir: 'out',
  trailingSlash: true, // Better compatibility with static hosting
  // Media file handling
  assetPrefix: '',
  // Experimental features (simplified)
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

export default nextConfig; 