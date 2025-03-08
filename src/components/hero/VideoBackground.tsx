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
  const [videoError, setVideoError] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Mark component as mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  // Mobile detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const detectMobile = () => {
      return window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };
    
    setIsMobile(detectMobile());
    
    const handleResize = () => {
      setIsMobile(detectMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to get proper video URL based on environment
  const getVideoUrl = (relativePath: string) => {
    // If it's an absolute URL, return as is
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // For production environment - use direct Cloudinary URL since this approach is working
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // Return the specific hero video URL that we know works
      if (relativePath.includes('hero-video')) {
        return "https://res.cloudinary.com/dk5tdyhcd/video/upload/v1741424087/hero-video_lv7684.mp4";
      }
    }
    
    // Fallback to original path
    return relativePath;
  };
  
  // Set up video with event listeners
  useEffect(() => {
    if (!hasMounted) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Reset state
    setVideoError(false);
    setVideoLoading(true);
    
    // Set the video source directly
    const videoPath = "/assets/videos/hero/hero-video.mp4";;
    video.src = getVideoUrl(videoPath);
    
    console.log('Hero video path:', getVideoUrl(videoPath));
    
    const handleCanPlay = () => {
      setVideoLoading(false);
      
      // For desktop - keep original behavior
      if (!isMobile) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error('Hero video autoplay failed:', err);
        });
      } 
      // For mobile - attempt autoplay but don't change state if it fails
      else {
        video.muted = true; // Ensure muted for mobile autoplay
        video.playsInline = true; // Ensure playsInline for mobile
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('Mobile autoplay attempted but not supported:', err);
          // Don't set error - just show play button for manual interaction
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
  }, [isMobile, hasMounted]);
  
  // Play button handler
  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    console.log('Play button clicked');
    
    // Reset error state on manual play attempt
    setVideoError(false);
    
    // For mobile devices - handle differently
    if (isMobile) {
      // Ensure video attributes are set correctly for mobile
      video.muted = true;
      video.playsInline = true;
      
      // For mobile, we need to make sure the source is loaded
      if (!video.src) {
        const videoPath = "/assets/videos/hero/hero-video.mp4";;
        video.src = getVideoUrl(videoPath);
        video.load();
      }
      
      // Slight delay to ensure everything is ready
      setTimeout(() => {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error('Hero video play failed on mobile click:', err);
          setVideoError(true);
        });
      }, 100);
    } 
    // For desktop - keep the original behavior
    else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Hero video play failed on click:', err);
        setVideoError(true);
      });
    }
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