'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  fallbackImageUrl: string;
}

export default function VideoBackground({ fallbackImageUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play now');
      setVideoLoaded(true);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError(true);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Attempt to load and play
    video.load();
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log('Video playing successfully'))
        .catch(err => {
          console.error('Video play failed:', err);
          // Some browsers won't autoplay without user interaction
          // We'll show the fallback image in this case
          setVideoError(true);
        });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {/* Loading spinner */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Fallback image always rendered but hidden when video plays */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${fallbackImageUrl}')` }}
        aria-hidden={videoLoaded && !videoError ? 'true' : 'false'}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="auto"
        poster={fallbackImageUrl}
      >
        <source src="/assets/videos/hero/hero-video.webm" type="video/webm" />
        <source src="/assets/videos/hero/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
} 