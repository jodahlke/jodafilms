"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
      });
    }

    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
      };
    }
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-black/60">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <video
          ref={videoRef}
          className={`object-cover w-full h-full transition-opacity duration-1000 ${videoLoaded ? 'opacity-70' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/videos/hero/poster.jpg"
        >
          <source src="/assets/videos/hero/hero-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="heading-xl mb-4">
            <span className="block text-[var(--primary)]">JONAS DAHLKE</span>
            FILMMAKER & CINEMATOGRAPHER
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Capturing stories through the lens with passion and innovation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="#portfolio" className="btn-primary">
              View Work
            </Link>
            <Link href="#contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 1 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 