"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiUser, FiStar } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Producer, Artisan Films",
    quote: "Working with John was a transformative experience for our project. His visual storytelling abilities elevated our documentary beyond our expectations, capturing the emotional core of each story.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director, Global Brands",
    quote: "John's work on our campaign was exceptional. He understood our brand vision immediately and translated it into stunning visuals that resonated deeply with our audience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Independent Film Director",
    quote: "As a director, finding a cinematographer who truly understands your vision is rare. John not only understood but enhanced every frame with his technical expertise and artistic sensibility.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "CEO, Horizon Media",
    quote: "The quality and efficiency of John's work is outstanding. He brings a unique perspective to every project and delivers results that consistently exceed expectations.",
    rating: 4,
  },
  {
    id: 5,
    name: "Olivia Taylor",
    role: "Music Artist",
    quote: "John captured the essence of my music in a way I didn't think was possible. His vision for my music video brought a new dimension to my art that has resonated strongly with fans.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-black to-[var(--secondary)]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            <span className="text-[var(--primary)]">CLIENT</span> TESTIMONIALS
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            What industry professionals and clients have to say about my work and collaborative process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-black/40 backdrop-blur-sm p-8 rounded-lg h-full flex flex-col">
                  <div className="mb-6">
                    {/* Star Rating */}
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FiStar
                          key={index}
                          className={`${
                            index < testimonial.rating
                              ? "text-[var(--primary)] fill-[var(--primary)]"
                              : "text-gray-600"
                          } w-5 h-5`}
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-200 italic mb-6">"{testimonial.quote}"</p>
                  </div>
                  
                  {/* Author */}
                  <div className="mt-auto flex items-center">
                    <div className="bg-[var(--primary)] rounded-full p-2 mr-4">
                      <FiUser className="text-black w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 