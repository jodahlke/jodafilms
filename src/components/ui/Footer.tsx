"use client";

import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[var(--secondary)] py-12 border-t border-gray-800">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-white inline-block mb-4">
              <span className="text-[var(--primary)]">JD</span> FILMS
            </Link>
            <p className="text-gray-400">
              &copy; {currentYear} JDfilms. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/privacy" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm inline-block">
                Datenschutzerklärung
              </Link>
              <Link href="/imprint" className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm inline-block">
                Impressum
              </Link>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="mb-8 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6">
              {["home", "about", "portfolio", "contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item}`}
                    className="text-gray-400 hover:text-[var(--primary)] transition-colors capitalize text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="bg-[var(--background)] hover:bg-[var(--primary)] text-white p-3 rounded-full transition-colors"
            aria-label="Back to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 