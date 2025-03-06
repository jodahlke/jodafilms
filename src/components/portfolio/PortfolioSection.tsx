"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FiX, FiExternalLink, FiVideo } from "react-icons/fi";
import Image from "next/image";

// Bind modal to document element
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

// Portfolio data with actual videos and thumbnails
const portfolioItems = [
  {
    id: 1,
    title: "Kasa Kundavi",
    category: "Commercial",
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/kasakundavi.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/hawaii-alex-smith.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/blowupmedia.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/mrge.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/mvmt.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/radio912.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/sl.jpg",
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
    thumbnail: "/assets/videos/Portfolio WEBM/thumbnails/vinature.jpg",
    videoSrc: "/assets/videos/Portfolio WEBM/vinature.webm",
    description: "An artistic commercial for Vinature, celebrating the beauty of natural wine and sustainable practices.",
    role: "Director & Cinematographer",
    year: 2023,
    client: "Vinature",
  },
];

const PortfolioSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [filter, setFilter] = useState("All");
  const [interactedItems, setInteractedItems] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openModal = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleItemInteraction = (itemId: number) => {
    setInteractedItems(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];
  
  const filteredItems = filter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

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
                onClick={() => setFilter(category)}
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
            const videoRef = useRef<HTMLVideoElement>(null);
            const hasInteracted = interactedItems[item.id] || false;

            const handleMouseEnter = useCallback(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(error => {
                  console.error("Video play failed:", error);
                });
                handleItemInteraction(item.id);
              }
            }, [item.id]);

            const handleMouseLeave = useCallback(() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }, []);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-video cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                onClick={() => openModal(item)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Thumbnail - Only visible before first interaction */}
                <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover portfolio-thumbnail"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 4}
                  />
                </div>

                {/* Preview Video */}
                <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${hasInteracted ? 'opacity-100' : 'opacity-0'}`}>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={item.videoSrc} type="video/webm" />
                  </video>
                </div>
                
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
        contentLabel="Project Details"
      >
        {selectedItem && (
          <div className="overflow-hidden">
            {/* Video Section */}
            <div className="relative aspect-video w-full bg-[var(--secondary)]">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 bg-[var(--secondary)]/80 text-white p-3 hover:bg-[var(--primary)] transition-colors"
              >
                <FiX size={28} />
              </button>
              
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src={selectedItem.videoSrc} type="video/webm" />
                Your browser does not support the video tag.
              </video>
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