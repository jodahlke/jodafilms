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

// Add Vimeo Player type
declare global {
  interface Window {
    Vimeo?: any;
  }
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

// Directly using Vimeo's embed without their SDK for more reliable playback
function HoverVideoThumbnail({
  vimeoUrl,
  thumbnailUrl,
  title,
  category,
  description,
  onClick,
  onHoverStart,
  onHoverEnd
}: {
  vimeoUrl: string;
  thumbnailUrl: string;
  title: string;
  category: string;
  description: string;
  onClick: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  // Extract Vimeo ID
  const vimeoId = vimeoUrl.split('/').pop();
  
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasFirstInteraction, setHasFirstInteraction] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Check for mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent;
        const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        return mobileCheck || window.innerWidth < 768;
      };
      
      setIsMobile(checkMobile());
      
      const handleResize = () => {
        setIsMobile(checkMobile());
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Setup intersection observer to preload videos when near viewport
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Mark as visible - this ensures iframe is rendered
            setIsLoaded(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Start loading when within 200px of viewport
    );
    
    observerRef.current.observe(containerRef.current);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
  
  // Event handlers
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    
    setIsHovered(true);
    setHasFirstInteraction(true);
    
    if (onHoverStart) onHoverStart();
    
    // Handle playback using postMessage API
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // Send multiple command methods to ensure it plays
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'play' }),
          '*'
        );
        
        // Also trigger play directly on the iframe element
        if (iframeRef.current.src.includes('autoplay=0')) {
          // Update src to force autoplay if needed
          const newSrc = iframeRef.current.src.replace('autoplay=0', 'autoplay=1');
          iframeRef.current.src = newSrc;
        }
      } catch (error) {
        console.error('Failed to play via postMessage:', error);
      }
    }
  }, [isMobile, onHoverStart]);
  
  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    
    setIsHovered(false);
    
    if (onHoverEnd) onHoverEnd();
    
    // Pause using postMessage API
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'pause' }),
          '*'
        );
      } catch (error) {
        console.error('Failed to pause via postMessage:', error);
      }
    }
  }, [isMobile, onHoverEnd]);
  
  // Listen for messages from the iframe to track load state
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    
    const handleMessage = (event: MessageEvent) => {
      if (!vimeoId) return;
      
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        
        if (data && data.event === 'ready') {
          setIsLoaded(true);
          
          // Pre-buffer video content
          if (iframeRef.current && iframeRef.current.contentWindow) {
            // Get first frame loaded
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ method: 'play' }),
              '*'
            );
            
            // Immediately pause to show first frame
            setTimeout(() => {
              if (!isHovered && iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                  JSON.stringify({ method: 'pause' }),
                  '*'
                );
              }
            }, 100);
          }
        }
      } catch (error) {
        // Ignore parsing errors from other messages
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [vimeoId, isMobile, isHovered]);
  
  // Build the iframe source URL with optimal parameters
  const getVimeoEmbedUrl = useCallback(() => {
    return `https://player.vimeo.com/video/${vimeoId}?background=1&autopause=0&transparent=0&autoplay=1&loop=1&muted=1&controls=0&quality=720p&dnt=1`;
  }, [vimeoId]);
  
  return (
    <div 
      ref={containerRef}
      className="group relative overflow-hidden aspect-video cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Thumbnail (only shown if never interacted with) */}
      <div 
        className={`absolute inset-0 z-10 transition-opacity duration-300 ${
          hasFirstInteraction && !isMobile ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>
      
      {/* Vimeo Background Player (shown once interaction happens or preloaded) */}
      {(isLoaded || hasFirstInteraction) && (
        <div 
          className={`absolute inset-0 z-20 transition-opacity duration-300 ${
            hasFirstInteraction && !isMobile ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <iframe
            ref={iframeRef}
            src={getVimeoEmbedUrl()}
            className="absolute inset-0 w-full h-full"
            frameBorder="0" 
            allow="autoplay; fullscreen"
            loading="eager"
            title={`${title} preview`}
          ></iframe>
        </div>
      )}
      
      {/* Content Overlay (always on top) */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-10 z-30">
        <div>
          <span className="text-[var(--primary)] text-base uppercase tracking-wider">{category}</span>
          <h3 className="text-3xl font-bold text-white mt-3">{title}</h3>
          <p className="text-gray-300 mt-3 text-lg line-clamp-2">{description}</p>
          <div className="mt-6 flex items-center">
            <span className="text-white text-base mr-2">View Project</span>
            <FiExternalLink className="text-[var(--primary)] w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated portfolio data with Vimeo links
const portfolioItems = [
  {
    id: 1,
    title: "Kasa Kundavi",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/kasakundavi.jpg",
    videoSrc: "https://vimeo.com/1070418839",
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
    videoSrc: "https://vimeo.com/1070418701",
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
    videoSrc: "https://vimeo.com/1070418805",
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
    videoSrc: "https://vimeo.com/1070418893",
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
    videoSrc: "https://vimeo.com/1070442029",
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
    videoSrc: "https://vimeo.com/1070418920",
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
    videoSrc: "https://vimeo.com/1070418942",
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
    videoSrc: "https://vimeo.com/1070418320",
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
  const [isClient, setIsClient] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isModalVideoPlaying, setIsModalVideoPlaying] = useState(false);
  const [isModalVideoLoading, setIsModalVideoLoading] = useState(false);
  const [modalVideoError, setModalVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Reference to modal video
  const modalVideoRef = useRef<HTMLVideoElement>(null);

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

  // Set isClient true once mounted
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  // Modal handlers
  const openModal = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear after animation
  }, []);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (modalIsOpen && selectedItem) {
      setIsModalVideoPlaying(false);
      setModalVideoError(false);
      setIsModalVideoLoading(false);
      setRetryCount(0);
    }
  }, [modalIsOpen, selectedItem]);

  // Extract Vimeo ID from URL
  const getVimeoId = (url: string) => {
    return url.startsWith('https://vimeo.com/') ? url.split('/').pop() : null;
  };

  // Memoize categories array
  const categories = Array.from(new Set(['All', ...portfolioItems.map(item => item.category)])) as Category[];
  
  // Memoize filtered items
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const handleFilterClick = useCallback((category: Category) => {
    setFilter(category);
  }, []);

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
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HoverVideoThumbnail
                vimeoUrl={item.videoSrc}
                thumbnailUrl={item.thumbnail}
                title={item.title}
                category={item.category}
                description={item.description}
                onClick={() => openModal(item)}
                onHoverStart={() => console.log(`Hovering item ${item.id}`)}
                onHoverEnd={() => console.log(`Left item ${item.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
                className="video-close-btn"
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
                <div className={`absolute inset-0 z-20 bg-black ${isModalVideoPlaying ? 'opacity-100' : 'opacity-0'}`}>
                  {isModalVideoPlaying && (
                    <>
                      {getVimeoId(selectedItem.videoSrc) ? (
                        <iframe
                          src={`https://player.vimeo.com/video/${getVimeoId(selectedItem.videoSrc)}?autoplay=1&loop=0&dnt=1`}
                          className="w-full h-full"
                          allow="autoplay; fullscreen; picture-in-picture"
                          frameBorder="0"
                          allowFullScreen
                          onLoad={() => {
                            setIsModalVideoLoading(false);
                            setModalVideoError(false);
                          }}
                        ></iframe>
                      ) : (
                        <video
                          key={`${selectedItem.id}-${retryCount}`}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                          preload="auto"
                          poster={selectedItem.thumbnail}
                          ref={modalVideoRef}
                          onLoadStart={() => {
                            setIsModalVideoLoading(true);
                          }}
                          onCanPlay={() => {
                            setIsModalVideoLoading(false);
                            if (modalVideoRef.current) {
                              if (isMobile) {
                                modalVideoRef.current.muted = false;
                                modalVideoRef.current.playsInline = true;
                                
                                modalVideoRef.current.play().catch(error => {
                                  console.error('Mobile auto-play failed, will need user interaction:', error);
                                  
                                  if (modalVideoRef.current) {
                                    modalVideoRef.current.controls = true;
                                  }
                                });
                              } else {
                                modalVideoRef.current.play().catch(error => {
                                  console.error('Auto-play failed:', error);
                                });
                              }
                            }
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLVideoElement;
                            console.error('Modal video error:', e, target.error);
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
                            src={selectedItem.videoSrc} 
                            type="video/mp4" 
                          />
                        </video>
                      )}
                    </>
                  )}
                </div>

                {/* Loading spinner */}
                {isModalVideoLoading && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Play button overlay */}
                {!isModalVideoPlaying && !modalVideoError && !isModalVideoLoading && (
                  <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      setIsModalVideoPlaying(true);
                      
                      // For Vimeo videos, show loading indicator until iframe loads
                      if (selectedItem && getVimeoId(selectedItem.videoSrc)) {
                        setIsModalVideoLoading(true);
                      }
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

export default PortfolioSection; 