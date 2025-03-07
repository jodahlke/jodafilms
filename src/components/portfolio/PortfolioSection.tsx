"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FiX, FiExternalLink, FiVideo, FiPlay } from "react-icons/fi";
import Image from "next/image";
import dynamic from 'next/dynamic';

// Ensure Modal is only initialized on the client side
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
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

// Portfolio data with thumbnails only - videos will be loaded only on the client side
const portfolioItems = [
  {
    id: 1,
    title: "Kasa Kundavi",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/kasakundavi.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/Kasa Kundavi.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/Kasa Kundavi.mp4",
    description: "A captivating commercial that showcases the essence of Kasa Kundavi, blending traditional values with modern storytelling.",
    role: "Director & Cinematographer",
    year: 2023,
    client: "Kasa Kundavi",
  },
  {
    id: 2,
    title: "Alex Smith",
    category: "Documentary",
    thumbnail: "/assets/videos/thumbnails/hawaii-alex-smith.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/alex smith.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/alex smith.mp4",
    description: "An intimate documentary portrait capturing the journey and passion of Alex Smith.",
    role: "Director of Photography",
    year: 2023,
    client: "Alex Smith",
  },
  {
    id: 3,
    title: "Blowup Media",
    category: "Corporate",
    thumbnail: "/assets/videos/thumbnails/blowupmedia.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/blowupmedia.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/blowupmedia.mp4",
    description: "A dynamic corporate video showcasing Blowup Media's innovative approach to digital advertising.",
    role: "Director & Editor",
    year: 2023,
    client: "Blowup Media",
  },
  {
    id: 4,
    title: "MRGE",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/mrge.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/mrge.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/mrge.mp4",
    description: "A sleek and modern commercial highlighting MRGE's cutting-edge products and services.",
    role: "Cinematographer",
    year: 2023,
    client: "MRGE",
  },
  {
    id: 5,
    title: "MVMT",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/mvmt.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/mvmt.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/mvmt.mp4",
    description: "A stylish commercial for MVMT watches, capturing the essence of modern lifestyle and fashion.",
    role: "Director & Cinematographer",
    year: 2023,
    client: "MVMT",
  },
  {
    id: 6,
    title: "Radio 912",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/radio912.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/radio912.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/radio912.mp4",
    description: "An energetic commercial for Radio 912, bringing sound and visuals together in perfect harmony.",
    role: "Director",
    year: 2023,
    client: "Radio 912",
  },
  {
    id: 7,
    title: "SL",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/sl.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/sl.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/sl.mp4",
    description: "A compelling commercial that tells the story of SL through sophisticated cinematography.",
    role: "Director of Photography",
    year: 2023,
    client: "SL",
  },
  {
    id: 8,
    title: "Vinature",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/vinature.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/vinature.webm",
    mp4VideoSrc: "/assets/videos/Mp4 Fallback/Portfolio/vinature.mp4",
    description: "An artistic commercial for Vinature, celebrating the beauty of natural wine and sustainable practices.",
    role: "Director & Cinematographer",
    year: 2023,
    client: "Vinature",
  },
] as const;

// Define the type based on the array elements
type PortfolioItem = (typeof portfolioItems)[number];
type Category = PortfolioItem['category'] | 'All';

const PortfolioSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<Category>('All');
  const [interactedItems, setInteractedItems] = useState<{[key: number]: boolean}>({});
  const [isClient, setIsClient] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  
  // Create a map of video refs outside the render loop
  const videoRefs = useRef<Map<number, HTMLVideoElement | null>>(new Map());

  // Detect Safari browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safari detection
      const isSafariBrowser = () => {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && ua.indexOf('android') === -1;
      };
      
      setIsSafari(isSafariBrowser());
    }
  }, []);

  // Detect mobile devices
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

  // Cleanup function for videos
  const cleanupVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    });
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }

    // Cleanup videos when component unmounts
    return () => {
      cleanupVideos();
    };
  }, [cleanupVideos]);

  // Reset video states when filter changes
  useEffect(() => {
    setInteractedItems({});
    cleanupVideos();
  }, [filter, cleanupVideos]);

  const openModal = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear after animation
  }, []);

  const handleItemInteraction = useCallback((itemId: number) => {
    setInteractedItems(prev => ({
      ...prev,
      [itemId]: true
    }));
  }, []);

  // Function to get absolute URL with proper handling for production
  const getVideoUrl = useCallback((relativePath: string) => {
    // If it's an absolute URL (starts with http or https), return as is
    if (relativePath.startsWith('http')) {
      return relativePath;
    }
    
    // For production environment (deployed site)
    if (process.env.NODE_ENV === 'production') {
      // Use relative paths on production to avoid CORS issues
      // Remove leading slash if present
      return relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    }
    
    // For development environment
    return isClient ? `${baseUrl}${relativePath}` : relativePath;
  }, [baseUrl, isClient]);

  // Function to get appropriate video URL based on browser
  const getAppropriateVideoUrl = useCallback((item: PortfolioItem) => {
    // For Safari browsers, immediately use MP4
    if (isSafari) {
      return getVideoUrl(item.mp4VideoSrc);
    }
    // For other browsers, use WebM
    return getVideoUrl(item.videoSrc);
  }, [isSafari, getVideoUrl]);

  // Create a dedicated video URL for the modal
  const getModalVideoUrl = useCallback((item: PortfolioItem) => {
    // Always use MP4 for Safari in production for maximum compatibility
    const videoPath = isSafari ? item.mp4VideoSrc : item.videoSrc;
    const url = getVideoUrl(videoPath);
    console.log(`Modal video URL: ${url} (Safari: ${isSafari}, Env: ${process.env.NODE_ENV})`);
    return url;
  }, [getVideoUrl, isSafari]);

  // Handler for mouse enter on portfolio items
  const handleMouseEnter = useCallback((item: PortfolioItem, index: number) => {
    if (!isClient) return;
    
    const videoElement = videoRefs.current.get(item.id);
    if (videoElement) {
      // If this is the first interaction, set up the video sources
      if (!interactedItems[item.id]) {
        // Clear any existing sources
        while (videoElement.firstChild) {
          videoElement.removeChild(videoElement.firstChild);
        }
        
        // Add appropriate source based on browser
        if (isSafari) {
          // For Safari, only add MP4 source
          const mp4Source = document.createElement('source');
          mp4Source.src = getVideoUrl(item.mp4VideoSrc);
          mp4Source.type = 'video/mp4';
          videoElement.appendChild(mp4Source);
        } else {
          // For other browsers, add both sources with WebM first
          const webmSource = document.createElement('source');
          webmSource.src = getVideoUrl(item.videoSrc);
          webmSource.type = 'video/webm';
          videoElement.appendChild(webmSource);
          
          const mp4Source = document.createElement('source');
          mp4Source.src = getVideoUrl(item.mp4VideoSrc);
          mp4Source.type = 'video/mp4';
          videoElement.appendChild(mp4Source);
        }
        
        // Load the video
        videoElement.load();
        
        // Mark as interacted
        handleItemInteraction(item.id);
      }
      
      // Play the video (will resume from where it was paused)
      const playVideo = () => {
        videoElement.play().catch(error => {
          console.error(`Video play failed for ${item.title}:`, error);
        });
      };
      
      setTimeout(playVideo, 100 * (index % 4));
    }
  }, [isClient, handleItemInteraction, getVideoUrl, isSafari, interactedItems]);

  // Handler for mouse leave on portfolio items
  const handleMouseLeave = useCallback((itemId: number) => {
    const videoElement = videoRefs.current.get(itemId);
    if (videoElement) {
      // Pause the video but don't reset it
      videoElement.pause();
    }
  }, []);

  const handleFilterClick = useCallback((category: Category) => {
    // Pause all videos before changing filter
    cleanupVideos();
    setFilter(category);
  }, [cleanupVideos]);

  // Handle video element in modal - needed for proper mobile interaction  
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // State to track if modal video is playing
  const [isModalVideoPlaying, setIsModalVideoPlaying] = useState(false);
  
  // Add loading state
  const [isModalVideoLoading, setIsModalVideoLoading] = useState(false);
  const [modalVideoError, setModalVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (modalIsOpen && selectedItem) {
      setIsModalVideoPlaying(false);
      setModalVideoError(false);
      setIsModalVideoLoading(false);
      setRetryCount(0);
    }
  }, [modalIsOpen, selectedItem]);

  // Debug: Log video sources when modal opens
  useEffect(() => {
    if (modalIsOpen && selectedItem && isClient) {
      console.log('Video sources available:', {
        mp4: getVideoUrl(selectedItem.mp4VideoSrc),
        webm: getVideoUrl(selectedItem.videoSrc),
        isSafari,
        isMobile,
        environment: process.env.NODE_ENV
      });
    }
  }, [modalIsOpen, selectedItem, getVideoUrl, isSafari, isMobile, isClient]);

  // Memoize categories array
  const categories = Array.from(new Set(['All', ...portfolioItems.map(item => item.category)])) as Category[];
  
  // Memoize filtered items
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Simple direct URL function for production video links
  const getProductionVideoUrl = useCallback((item: PortfolioItem) => {
    if (isSafari) {
      // Ensure valid URL encoding for special characters in filenames
      return item.mp4VideoSrc.replace(/ /g, '%20');
    }
    return item.videoSrc.replace(/ /g, '%20');
  }, [isSafari]);

  return (
    <section id="portfolio" className="section-padding">
      <div className="px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 content-overlay py-8 rounded-lg"
        >
          <h2 className="heading-lg mb-12">
            <span className="text-[var(--primary)]">FEATURED</span> WORK
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`px-8 py-3 rounded-md transition-all text-lg ${
                  filter === category 
                    ? "bg-[var(--primary)] text-white" 
                    : "bg-[var(--secondary)]/90 text-white hover:bg-[var(--secondary)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[2400px] mx-auto">
          {filteredItems.map((item, index) => {
            const hasInteracted = interactedItems[item.id] || false;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-video cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                onClick={() => openModal(item)}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                {/* Thumbnail */}
                <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${hasInteracted && isClient ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover portfolio-thumbnail"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={80}
                  />
                </div>

                {/* Preview Video */}
                {isClient && (
                  <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}>
                    <video
                      ref={el => {
                        if (el) videoRefs.current.set(item.id, el);
                      }}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="none"
                      onError={(e) => console.error(`Video error for ${item.title}:`, e)}
                    />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-10 z-30">
                  <div>
                    <span className="text-[var(--primary)] text-base uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-3xl font-bold text-white mt-3">{item.title}</h3>
                    <p className="text-gray-300 mt-3 text-lg line-clamp-2">{item.description}</p>
                    <div className="mt-6 flex items-center">
                      <span className="text-white text-base mr-2">View Project</span>
                      <FiExternalLink className="text-[var(--primary)] w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Use ClientOnly for Modal to prevent hydration issues */}
      {isClient && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-content w-[95vw] max-w-[2000px] p-0 outline-none mx-auto"
          overlayClassName="modal-overlay"
          contentLabel={`Project details for ${selectedItem?.title || 'Selected project'}`}
          shouldReturnFocusAfterClose={true}
          closeTimeoutMS={300}
        >
          {selectedItem && (
            <div className="p-0 md:p-4 lg:p-8 relative" suppressHydrationWarning>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6" />
              </button>
              
              {/* Video Section */}
              <ClientOnly className="relative aspect-video w-full bg-black">
                {/* Video poster (thumbnail) */}
                {!isModalVideoPlaying && (
                  <div className="absolute inset-0 z-10">
                    <Image
                      src={selectedItem.thumbnail}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                  </div>
                )}
                
                {/* Video element - only shown when playing */}
                {isModalVideoPlaying && (
                  <div className="absolute inset-0 z-20 bg-black">
                    {process.env.NODE_ENV === 'production' ? (
                      // Use a simpler video approach in production
                      <video
                        key={`${selectedItem.id}-${retryCount}`}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        poster={selectedItem.thumbnail}
                        src={getProductionVideoUrl(selectedItem)}
                        onError={(e) => {
                          console.error('Modal video error:', e);
                          setModalVideoError(true);
                          setIsModalVideoLoading(false);
                          setIsModalVideoPlaying(false);
                        }}
                        onCanPlay={() => {
                          setIsModalVideoLoading(false);
                          setModalVideoError(false);
                        }}
                        onPlaying={() => {
                          setIsModalVideoLoading(false);
                          setModalVideoError(false);
                        }}
                      />
                    ) : (
                      // Development version with more debugging
                      <video
                        key={`${selectedItem.id}-${retryCount}`}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        poster={selectedItem.thumbnail}
                        onLoadStart={() => setIsModalVideoLoading(true)}
                        onCanPlay={() => setIsModalVideoLoading(false)}
                        onError={(e) => {
                          console.error('Modal video error:', e);
                          setModalVideoError(true);
                          setIsModalVideoLoading(false);
                          setIsModalVideoPlaying(false);
                        }}
                        onPlaying={() => {
                          setIsModalVideoLoading(false);
                          setModalVideoError(false);
                        }}
                      >
                        <source 
                          src={getVideoUrl(selectedItem.mp4VideoSrc)} 
                          type="video/mp4"
                        />
                        {!isSafari && (
                          <source 
                            src={getVideoUrl(selectedItem.videoSrc)} 
                            type="video/webm"
                          />
                        )}
                        Your browser does not support HTML video.
                      </video>
                    )}
                  </div>
                )}

                {/* Loading spinner */}
                {isModalVideoLoading && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Play button overlay - only show when not playing and not loading */}
                {!isModalVideoPlaying && !modalVideoError && !isModalVideoLoading && (
                  <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                    onClick={() => {
                      console.log('Play button clicked');
                      setIsModalVideoPlaying(true);
                    }}
                  >
                    <div className="bg-[var(--primary)] rounded-full p-6 animate-pulse">
                      <FiPlay className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}

                {/* Error message */}
                {modalVideoError && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
                    <div className="text-center p-6">
                      <p className="text-white text-lg mb-4">Video playback error</p>
                      <button
                        onClick={() => {
                          console.log('Retry attempt:', retryCount + 1);
                          setRetryCount(prev => prev + 1);
                          setModalVideoError(false);
                          setIsModalVideoPlaying(true);
                        }}
                        className="bg-[var(--primary)] text-white px-6 py-3 rounded-md hover:bg-opacity-80 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </ClientOnly>
              
              {/* Project Details */}
              <div className="p-10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div>
                    <span className="text-[var(--primary)] text-lg uppercase tracking-wider">{selectedItem.category}</span>
                    <h3 className="text-4xl font-bold text-white mt-2">{selectedItem.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-lg">{selectedItem.year}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-xl mb-10">{selectedItem.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[var(--primary)] font-bold text-xl mb-3">ROLE</h4>
                    <p className="text-gray-300 text-lg">{selectedItem.role}</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--primary)] font-bold text-xl mb-3">CLIENT</h4>
                    <p className="text-gray-300 text-lg">{selectedItem.client}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
};

// Export as client-only component to avoid hydration issues
export default PortfolioSection; 