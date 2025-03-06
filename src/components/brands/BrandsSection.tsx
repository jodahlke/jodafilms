"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

// Updated brands data with actual logo files
const brands = [
  {
    id: 1,
    name: "Mercedes Benz",
    logo: "/assets/logos/mercedesbenz.png",
  },
  {
    id: 2,
    name: "Vodafone",
    logo: "/assets/logos/vodafone.png",
  },
  {
    id: 3,
    name: "Xiaomi",
    logo: "/assets/logos/xiaomi.png",
  },
  {
    id: 4,
    name: "Lieferando",
    logo: "/assets/logos/lieferando.png",
  },
  {
    id: 5,
    name: "Boss",
    logo: "/assets/logos/boss.jpg",
  },
  {
    id: 6,
    name: "Fuji",
    logo: "/assets/logos/fuji.png",
  },
  {
    id: 7,
    name: "Lee",
    logo: "/assets/logos/lee.png",
  },
  {
    id: 8,
    name: "ZF",
    logo: "/assets/logos/zf.svg",
  },
  {
    id: 9,
    name: "90s",
    logo: "/assets/logos/90s.png",
  },
  {
    id: 10,
    name: "AMG",
    logo: "/assets/logos/amg.png",
  },
  {
    id: 11,
    name: "Sunrise",
    logo: "/assets/logos/sunrise.png",
  },
  {
    id: 12,
    name: "Mana",
    logo: "/assets/logos/mana.png",
  },
];

const BrandsSection = () => {
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="brands" className="section-padding bg-[var(--secondary)]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 content-overlay p-8"
        >
          <h2 className="heading-lg mb-4">
            <span className="text-[var(--primary)]">TRUSTED BY</span> BRANDS
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Proud to have collaborated with these amazing companies on various projects
          </p>
        </motion.div>

        {/* First row of brands */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 content-overlay p-6"
        >
          {isClient && (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              className="brands-slider"
            >
              {brands.slice(0, 6).map((brand) => (
                <SwiperSlide key={brand.id} className="py-4">
                  <div className="flex items-center justify-center h-24 px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <div className="h-16 w-full flex items-center justify-center bg-white rounded-md shadow-sm p-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={60}
                        className="object-contain max-h-full"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>

        {/* Second row of brands - moving in opposite direction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="content-overlay p-6"
        >
          {isClient && (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              className="brands-slider"
            >
              {brands.slice(6, 12).map((brand) => (
                <SwiperSlide key={brand.id} className="py-4">
                  <div className="flex items-center justify-center h-24 px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <div className="h-16 w-full flex items-center justify-center bg-white rounded-md shadow-sm p-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={120}
                        height={60}
                        className="object-contain max-h-full"
                        sizes="120px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection; 