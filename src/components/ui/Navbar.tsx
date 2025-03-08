"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Set initial scroll state
    if (typeof window !== 'undefined') {
      setScrolled(window.scrollY > 50);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
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