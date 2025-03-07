"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FiX, FiExternalLink, FiVideo, FiPlay } from "react-icons/fi";
import Image from "next/image";

// Bind modal to document element
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

// Portfolio data with thumbnails only - videos will be loaded only on the client side
const portfolioItems = [
  {
    id: 1,
    title: "Kasa Kundavi",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/kasakundavi.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/Kasa Kundavi.webm",
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
  
  // Create a map of video refs outside the render loop
  const videoRefs = useRef<Map<number, HTMLVideoElement | null>>(new Map());

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

  // Handler for mouse enter on portfolio items
  const handleMouseEnter = useCallback((item: PortfolioItem, index: number) => {
    if (!isClient) return;
    
    const videoElement = videoRefs.current.get(item.id);
    if (videoElement) {
      const playVideo = () => {
        videoElement.play().catch(error => {
          console.error(`Video play failed for ${item.title}:`, error);
        });
        handleItemInteraction(item.id);
      };
      
      setTimeout(playVideo, 100 * (index % 4));
    }
  }, [isClient, handleItemInteraction]);

  // Handler for mouse leave on portfolio items
  const handleMouseLeave = useCallback((itemId: number) => {
    const videoElement = videoRefs.current.get(itemId);
    if (videoElement) {
      videoElement.pause();
    }
  }, []);

  // Memoize categories array
  const categories = Array.from(new Set(['All', ...portfolioItems.map(item => item.category)])) as Category[];
  
  // Memoize filtered items
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Function to get absolute URL
  const getVideoUrl = useCallback((relativePath: string) => {
    return isClient ? `${baseUrl}${relativePath}` : relativePath;
  }, [baseUrl, isClient]);

  const handleFilterClick = useCallback((category: Category) => {
    // Pause all videos before changing filter
    cleanupVideos();
    setFilter(category);
  }, [cleanupVideos]);

  // Handle video element in modal - needed for proper mobile interaction  
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Function to handle modal video playback, especially for mobile
  const ensureModalVideoPlays = useCallback(() => {
    if (modalVideoRef.current && selectedItem) {
      const modalVideo = modalVideoRef.current;
      
      // Force video source using direct URL
      const videoSource = getVideoUrl(selectedItem.videoSrc);
      
      // Directly set the source attribute instead of using child elements
      // This works better on mobile
      modalVideo.src = videoSource;
      
      // For Safari mobile compatibility
      modalVideo.load();
      
      // On mobile devices, we don't autoplay - instead rely on user clicking the play control
      // This is more reliable and avoids restrictions
      if (!isMobile) {
        // Only try autoplay on desktop
        setTimeout(() => {
          modalVideo.play().catch(error => {
            console.error('Modal video play error:', error);
            // Play failed, but controls are visible so user can play manually
          });
        }, 300);
      }
    }
  }, [selectedItem, getVideoUrl, isMobile]);

  // When modal opens, ensure video plays
  useEffect(() => {
    if (modalIsOpen && selectedItem) {
      ensureModalVideoPlays();
    }
  }, [modalIsOpen, selectedItem, ensureModalVideoPlays]);

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
                    >
                      {hasInteracted && (
                        <source src={getVideoUrl(item.videoSrc)} type="video/webm" />
                      )}
                    </video>
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

      {/* Project Modal */}
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
          <div className="p-0 md:p-4 lg:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>
            
            {/* Video Section */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={modalVideoRef}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="auto"
                poster={selectedItem.thumbnail}
                controlsList="nodownload"
              />
              
              {/* Add play button overlay for mobile */}
              {isMobile && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="bg-[var(--primary)]/50 rounded-full p-4 animate-pulse pointer-events-none">
                    <FiPlay className="w-12 h-12 text-white" />
                  </div>
                </div>
              )}
            </div>
            
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
    </section>
  );
};

export default PortfolioSection; 