"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-lg text-center mb-16">
            <span className="text-[var(--primary)]">ABOUT</span> ME
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto md:ml-0"
          >
            <div className="absolute inset-0 border-2 border-[var(--primary)] translate-x-4 translate-y-4 z-0"></div>
            <div className="relative z-10 h-full w-full overflow-hidden content-overlay">
              <Image
                src="/assets/photos/user/jonas.jpg"
                alt="Jonas Dahlke - Filmmaker & Cinematographer from Düsseldorf, Germany"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="content-overlay p-6"
          >
            <h3 className="text-2xl font-bold mb-4">Jonas Dahlke</h3>
            <p className="text-lg text-gray-300 mb-6">
              Creative filmmaker, certified FPV drone pilot, and director of photography with over 10 years of experience in cinematic filmmaking, drone videography, and commercial productions across Germany and internationally.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[var(--primary)] font-bold mb-2">VISION</h4>
                <p className="text-gray-300">
                  I approach each project with a distinctive visual style that blends classical cinematography techniques with innovative modern approaches. My work is characterized by thoughtful composition, dramatic lighting, and emotionally resonant storytelling.
                </p>
              </div>
              
              <div>
                <h4 className="text-[var(--primary)] font-bold mb-2">EXPERIENCE</h4>
                <p className="text-gray-300">
                  From captivating documentary films to engaging social media videos for brands like Mercedes-Benz, Fujifilm, and Xiaomi, my diverse portfolio demonstrates versatility and consistent quality across genres. Born in Düsseldorf, Germany, I combine German precision with creative innovation, specializing in dynamic FPV drone cinematography that captures perspectives impossible to achieve with traditional methods.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 