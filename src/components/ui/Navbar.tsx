"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Set initial scroll state
    if (typeof window !== 'undefined') {
      setScrolled(window.scrollY > 50);
      
      // Calculate initial scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        setScrollProgress((window.scrollY / windowHeight) * 100);
      }
    }

    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Calculate scroll progress percentage (0-100)
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        const scrolled = (window.scrollY / windowHeight) * 100;
        setScrollProgress(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled py-4" : "navbar-transparent py-6"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-[var(--primary)]">JD</span> FILMS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {["home", "about", "portfolio", "contact"].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item}`}
                  className="text-white hover:text-[var(--primary)] transition-colors uppercase text-sm tracking-wider"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Scroll Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
        <div 
          className="h-full bg-white"
          style={{ 
            width: '100%', 
            transform: `translateX(${scrollProgress - 100}%)`,
            transition: 'transform 0.1s ease-out'
          }}
          aria-hidden="true"
        />
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden absolute top-full left-0 w-full navbar-scrolled py-6 animate-fade-in"
          aria-hidden={!isOpen}
        >
          <nav className="container-custom">
            <ul className="flex flex-col space-y-4">
              {["home", "about", "portfolio", "contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item}`}
                    className="block text-white hover:text-[var(--primary)] transition-colors uppercase text-lg tracking-wider"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar; 