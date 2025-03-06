import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import BrandsSection from "@/components/brands/BrandsSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <div className="film-grain"></div>
      <Navbar />
      <HeroSection />
      
      <div className="bg-image-wrapper">
        <AboutSection />
        <PortfolioSection />
      </div>
      
      <BrandsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
