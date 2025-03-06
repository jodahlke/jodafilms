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
  // Media file handling
  assetPrefix: '',
  // Optimize specific packages that are causing slowdown
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
    optimizeCss: true, // Enable CSS optimization
  },
  // Only include necessary polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Configure webpack to handle media files
  webpack: (config) => {
    // Add more source maps in development
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map';
    }
    
    // Support for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

export default nextConfig; 