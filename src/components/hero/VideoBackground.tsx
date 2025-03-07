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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);

  // Detect mobile device
  useEffect(() => {
    // Simple mobile detection
    const checkMobile = () => {
      return (
        typeof window !== 'undefined' && 
        (window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      );
    };

    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Create absolute URLs
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const webmSource = `${baseUrl}/assets/videos/hero/hero-video.webm`;
    
    // Add sources programmatically to ensure correct URLs
    const webmSourceElement = document.createElement('source');
    webmSourceElement.src = webmSource;
    webmSourceElement.type = 'video/webm';
    video.appendChild(webmSourceElement);

    setDebugInfo(`Attempting to load video from: ${webmSource}`);
    
    const handleCanPlay = () => {
      console.log('Video can play now');
      setVideoLoaded(true);
      setDebugInfo(prev => `${prev}\nVideo loaded successfully`);

      // Only try to autoplay on non-mobile devices
      if (!isMobile) {
        attemptAutoplay();
      } else {
        // On mobile, we'll wait for user interaction
        setNeedsUserInteraction(true);
      }
    };

    const attemptAutoplay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
            setDebugInfo(prev => `${prev}\nVideo playing successfully`);
            setNeedsUserInteraction(false);
          })
          .catch(err => {
            console.error('Video play failed:', err);
            setDebugInfo(prev => `${prev}\nPlay failed: ${err.message || err}`);
            // We'll show the play button in this case
            setNeedsUserInteraction(true);
          });
      }
    };

    const handleError = (e: Event) => {
      const error = (video.error?.message || 'Unknown error') + 
                    ` (code: ${video.error?.code || 'unknown'})`;
      console.error('Video error:', error);
      setErrorMessage(error);
      setVideoError(true);
      setDebugInfo(prev => `${prev}\nError: ${error}`);
    };

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // For network errors
    window.addEventListener('online', () => {
      setDebugInfo(prev => `${prev}\nNetwork connection restored. Reloading video.`);
      video.load();
    });

    // Attempt to load video
    video.load();
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [isMobile]);

  // Function to manually play video (for mobile or when autoplay is blocked)
  const handlePlayButtonClick = () => {
    const video = videoRef.current;
    if (!video) return;
    
    // Try to play
    video.play()
      .then(() => {
        setNeedsUserInteraction(false);
        setVideoError(false);
      })
      .catch(err => {
        console.error('Manual play failed:', err);
        setDebugInfo(prev => `${prev}\nManual play failed: ${err.message || err}`);
      });
  };

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {/* Loading spinner */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play button - shown when autoplay is blocked or on mobile */}
      {needsUserInteraction && videoLoaded && !videoError && (
        <button 
          onClick={handlePlayButtonClick}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
          aria-label="Play video"
        >
          <div className="bg-[var(--primary)] rounded-full p-4 animate-pulse">
            <FiPlay className="w-10 h-10 text-white" />
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
      
      {/* Fallback image always rendered but hidden when video plays */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded && !videoError && !needsUserInteraction ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${fallbackImageUrl}')` }}
        aria-hidden={videoLoaded && !videoError && !needsUserInteraction ? 'true' : 'false'}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full transition-opacity duration-1000 ${videoLoaded && !videoError && !needsUserInteraction ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="auto"
        poster={fallbackImageUrl}
      >
        {/* Sources will be added programmatically in useEffect */}
      </video>
    </div>
  );
} 