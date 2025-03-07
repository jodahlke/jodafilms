'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPlay } from 'react-icons/fi';

interface VideoBackgroundProps {
  fallbackImageUrl: string;
}

export default function VideoBackground({ fallbackImageUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isSafari, setIsSafari] = useState(false);
  
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
  
  // Set up video with event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set video source based on browser
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    video.src = isSafari 
      ? `${baseUrl}/assets/videos/Mp4 Fallback/hero-video.mp4`
      : `${baseUrl}/assets/videos/hero/hero-video.webm`;
    
    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoLoading(false);
      
      // Try to autoplay
      video.play().then(() => {
        console.log('Autoplay successful');
        setIsPlaying(true);
      }).catch(err => {
        console.error('Autoplay failed:', err);
      });
    };
    
    const handlePlay = () => {
      console.log('Video playing');
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log('Video paused');
      setIsPlaying(false);
    };
    
    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoLoading(false);
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
  }, [isSafari]);
  
  // Play button handler
  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    console.log('Play button clicked');
    video.play().then(() => {
      console.log('Play on click successful');
      setIsPlaying(true);
    }).catch(err => {
      console.error('Play failed on click:', err);
    });
  };
  
  return (
    <div className="absolute inset-0 z-0 bg-black">
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
      {videoLoading && (
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
    </div>
  );
} 