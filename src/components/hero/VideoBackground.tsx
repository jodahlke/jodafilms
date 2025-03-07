'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPlay } from 'react-icons/fi';

interface VideoBackgroundProps {
  fallbackImageUrl: string;
}

export default function VideoBackground({ fallbackImageUrl }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = 
        typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      return mobile || (typeof window !== 'undefined' && window.innerWidth < 768);
    };

    setIsMobile(checkMobile());
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up video source
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin;
      setVideoUrl(`${baseUrl}/assets/videos/hero/hero-video.webm`);
    }
  }, []);

  // Handle video loading and events
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    // Set up event listeners
    const handleLoadedData = () => {
      console.log('Video data loaded');
      setVideoLoaded(true);
      setVideoError(false);
      
      // Only attempt autoplay on desktop
      if (!isMobile) {
        handlePlayAttempt();
      }
    };

    const handleError = () => {
      const error = video.error 
        ? `Error code: ${video.error.code}, message: ${video.error.message}` 
        : 'Unknown video error';
      console.error(error);
      setErrorMessage(error);
      setVideoError(true);
      setVideoPlaying(false);
    };

    const handlePlaying = () => {
      setVideoPlaying(true);
      console.log('Video is now playing');
    };

    const handlePause = () => {
      setVideoPlaying(false);
      console.log('Video is paused');
    };

    // Add listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);

    // Set source directly
    if (!video.src) {
      video.src = videoUrl;
      video.load();
    }

    return () => {
      // Remove listeners on cleanup
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoUrl, isMobile]);

  // Function to handle play attempts
  const handlePlayAttempt = () => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Attempting to play video...');
    
    // Reset video if it ended
    if (video.ended) {
      video.currentTime = 0;
    }
    
    // Make play attempt with better error handling
    video.play()
      .then(() => {
        console.log('Play command accepted');
        setVideoPlaying(true);
        setVideoError(false);
      })
      .catch(err => {
        console.error('Play failed:', err.message);
        setVideoPlaying(false);
        // Don't set error to true - we'll show the play button instead
      });
  };

  // Handle play button click
  const handlePlayButtonClick = () => {
    handlePlayAttempt();
  };

  // Determine if we should show the play button
  const showPlayButton = videoLoaded && !videoPlaying && (isMobile || !videoPlaying);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {/* Loading spinner */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play button */}
      {showPlayButton && (
        <button 
          onClick={handlePlayButtonClick}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
          aria-label="Play background video"
        >
          <div className="bg-[var(--primary)] rounded-full p-4 animate-pulse">
            <FiPlay className="w-12 h-12 text-white" />
          </div>
        </button>
      )}
      
      {/* Debug info in development */}
      {process.env.NODE_ENV !== 'production' && videoError && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 text-xs z-50 max-h-48 overflow-auto">
          <h4 className="font-bold">Video Debug Info:</h4>
          <p className="text-red-400">{errorMessage}</p>
          <pre className="mt-2 whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}
      
      {/* Fallback image - shown until video is playing */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${fallbackImageUrl}')` }}
        aria-hidden={videoPlaying ? 'true' : 'false'}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full transition-opacity duration-1000 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="auto"
        poster={fallbackImageUrl}
      />
    </div>
  );
} 