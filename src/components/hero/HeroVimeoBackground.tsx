'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Add Vimeo Player type
declare global {
  interface Window {
    Vimeo?: any;
  }
}

interface HeroVimeoBackgroundProps {
  vimeoUrl: string;
  fallbackImageUrl: string;
  overlayOpacity?: number; // 0-100
  children?: React.ReactNode;
  priority?: boolean;
  className?: string;
}

export default function HeroVimeoBackground({
  vimeoUrl,
  fallbackImageUrl,
  overlayOpacity = 40,
  children,
  priority = true,
  className = '',
}: HeroVimeoBackgroundProps) {
  // State
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [screenSize, setScreenSize] = useState<'sm'|'md'|'lg'|'xl'>('lg');
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  // Extract Vimeo ID
  const vimeoId = vimeoUrl?.split('/').pop() || '';
  
  // Check for mobile device and screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for mobile device
      const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobileCheck);
      
      // Update screen size based on width
      const updateScreenSize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setScreenSize('sm');
          setIsMobile(true);
        } else if (width < 768) {
          setScreenSize('md');
          setIsMobile(true);
        } else if (width < 1024) {
          setScreenSize('lg');
          setIsMobile(false);
        } else {
          setScreenSize('xl');
          setIsMobile(false);
        }
      };
      
      // Initialize
      updateScreenSize();
      
      // Handle resize
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);
  
  // Get scale based on screen size
  const getVideoScale = () => {
    switch(screenSize) {
      case 'sm': return 1.5; // Mobile portrait
      case 'md': return 1.2; // Tablet
      case 'lg': return 1.0; // Small desktop - no scaling
      case 'xl': return 1.0; // Large desktop - no scaling
      default: return 1.0;
    }
  };
  
  // Load Vimeo SDK
  useEffect(() => {
    if (!vimeoId || typeof window === 'undefined') return;
    
    // Only load if not already loaded
    if (!window.Vimeo && !document.getElementById('vimeo-player-sdk')) {
      const script = document.createElement('script');
      script.id = 'vimeo-player-sdk';
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [vimeoId]);
  
  // Initialize player
  useEffect(() => {
    if (!vimeoId || !videoRef.current || typeof window === 'undefined') return;
    
    // Only initialize if we're not on mobile and Vimeo SDK is available
    const initializePlayer = () => {
      if (!window.Vimeo) return;
      
      // Initialize with optimal settings for hero video
      const vimeoPlayer = new window.Vimeo.Player(videoRef.current, {
        id: vimeoId,
        background: true,       // Hide controls, autoplays, loops silently
        autopause: false,       // Don't pause when another video plays
        autoplay: true,         // Start as soon as possible
        loop: true,             // Loop continuously
        muted: true,            // Always muted for autoplay
        transparent: false,     // Better performance
        responsive: true,       // Adapt to container size
        dnt: true               // Do not track
      });
      
      setPlayer(vimeoPlayer);
      
      // Handle load event
      vimeoPlayer.ready().then(() => {
        setIsLoaded(true);
        
        // Ensure it's playing
        vimeoPlayer.play().catch((err: Error) => {
          console.warn('Could not autoplay hero video:', err);
        });
        
        // Set volume to 0 (belt and suspenders approach with muted)
        vimeoPlayer.setVolume(0);
      });
    };
    
    // Check if SDK is loaded or wait for it
    if (window.Vimeo) {
      initializePlayer();
    } else {
      const checkVimeo = setInterval(() => {
        if (window.Vimeo) {
          clearInterval(checkVimeo);
          initializePlayer();
        }
      }, 200);
      
      return () => clearInterval(checkVimeo);
    }
    
    // Cleanup
    return () => {
      if (player) {
        player.unload();
      }
    };
  }, [vimeoId, player]);
  
  // Optimize performance: pause video when not visible
  useEffect(() => {
    if (!player || typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Only checking the first entry (our container)
        const entry = entries[0];
        
        if (entry.isIntersecting) {
          player.play().catch(() => {});
        } else {
          player.pause().catch(() => {});
        }
      },
      { threshold: 0.1 } // When 10% or more is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [player]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Video or Image based on device */}
      {!isMobile ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            ref={videoRef}
            src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p`}
            className={`absolute w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${getVideoScale()})`,
              minWidth: '100%',
              minHeight: '100%',
            }}
            allow="autoplay; fullscreen"
            frameBorder="0"
            aria-hidden="true"
          ></iframe>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={fallbackImageUrl}
            alt="Hero background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={priority}
          />
        </div>
      )}
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none" 
        style={{ opacity: overlayOpacity / 100 }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 