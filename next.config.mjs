/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: false, // Turn off strict mode for performance
  // Turn on output static exports for Netlify
  output: 'export',
  distDir: 'out',
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