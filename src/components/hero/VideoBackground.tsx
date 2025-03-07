'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPlay } from 'react-icons/fi';

interface VideoBackgroundProps {
  fallbackImageUrl: string;
}

// Create a client-only wrapper to handle hydration issues
function ClientOnly({ children, ...delegated }: { children: React.ReactNode } & any) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default function VideoBackground({ fallbackImageUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isSafari, setIsSafari] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Mark component as mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Browser detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const detectMobile = () => {
      return window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };
    
    const detectSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    };
    
    setIsMobile(detectMobile());
    setIsSafari(detectSafari());
    
    const handleResize = () => {
      setIsMobile(detectMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to get proper video URL based on environment
  const getVideoUrl = (relativePath: string) => {
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // For production environment
    if (process.env.NODE_ENV === 'production') {
      // Use relative paths on production to avoid CORS issues
      // Also encode spaces for better URL compatibility
      const path = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
      return path.replace(/ /g, '%20');
    }
    
    // For development
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}${relativePath}`;
  };
  
  // Set up video with event listeners
  useEffect(() => {
    if (!hasMounted) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Reset state
    setVideoError(false);
    setVideoLoading(true);
    
    // In production, use a simpler approach
    if (process.env.NODE_ENV === 'production') {
      // Set video source directly
      video.src = isSafari 
        ? getVideoUrl('/assets/videos/Mp4 Fallback/hero-video.mp4')
        : getVideoUrl('/assets/videos/hero/hero-video.webm');
    } else {
      // In development, use source elements
      // Clear existing sources
      while (video.firstChild) {
        video.removeChild(video.firstChild);
      }
      
      // Add MP4 source (always first for maximum compatibility)
      const mp4Source = document.createElement('source');
      mp4Source.src = getVideoUrl('/assets/videos/Mp4 Fallback/hero-video.mp4');
      mp4Source.type = 'video/mp4';
      video.appendChild(mp4Source);
      
      // Add WebM source if not Safari
      if (!isSafari) {
        const webmSource = document.createElement('source');
        webmSource.src = getVideoUrl('/assets/videos/hero/hero-video.webm');
        webmSource.type = 'video/webm';
        video.appendChild(webmSource);
      }
    }
    
    const handleCanPlay = () => {
      setVideoLoading(false);
      
      // Try to autoplay on desktop only
      if (!isMobile) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error('Hero video autoplay failed:', err);
        });
      }
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };
    
    const handleError = (e: Event) => {
      console.error('Hero video error:', e);
      setVideoLoading(false);
      setVideoError(true);
    };
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    
    // Load the video
    video.load();
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [isSafari, isMobile, hasMounted]);
  
  // Play button handler
  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    // Reset error state on manual play attempt
    setVideoError(false);
    
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.error('Hero video play failed on click:', err);
      setVideoError(true);
    });
  };
  
  // Use fallback image if not mounted yet (avoid hydration mismatch)
  if (!hasMounted) {
    return (
      <div className="absolute inset-0 z-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${fallbackImageUrl}')` }}
        />
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 z-0 bg-black" suppressHydrationWarning>
      {/* Fallback image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${fallbackImageUrl}')` }}
        aria-hidden={isPlaying ? 'true' : 'false'}
      />
      
      {/* Video element */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="auto"
        poster={fallbackImageUrl}
      />
      
      {/* Loading spinner */}
      {videoLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play button - only show when video is ready but not playing */}
      {!videoLoading && !isPlaying && (
        <button 
          onClick={handlePlayClick}
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
          aria-label="Play background video"
        >
          <div className="bg-[var(--primary)] rounded-full p-6 animate-pulse">
            <FiPlay className="w-12 h-12 text-white" />
          </div>
        </button>
      )}
      
      {/* Error message */}
      {videoError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <div className="text-center p-6">
            <p className="text-white text-lg mb-4">Video playback error</p>
            <button
              onClick={handlePlayClick}
              className="bg-[var(--primary)] text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 