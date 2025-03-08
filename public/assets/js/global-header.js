/**
 * Global Header Component for RSR Site
 * 
 * This script provides the functionality for the global header component.
 */

document.addEventListener("DOMContentLoaded", function() {
  // Initialize the header functionality
  initializeGlobalHeader();
  
  /**
   * Initialize header functionality
   */
  function initializeGlobalHeader() {
    console.log("Initializing RSR global header functionality");
    
    // Elements
    const header = document.querySelector('.gh-fixed-header');
    const menuBtn = document.querySelector('.gh-menu-btn');
    const nav = document.querySelector('.gh-nav');
    const redLine = document.getElementById('gh-red-line');
    const scrollProgressBar = document.querySelector('.gh-scroll-progress-bar');
    
    // State
    let menuOpen = false;
    
    // Burger menu functionality
    if (menuBtn && nav) {
      console.log("Menu button and navigation found, adding event listeners");
      
      menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
          menuBtn.classList.add('open');
          nav.classList.add('open');
          document.body.style.overflow = 'hidden';
          nav.style.visibility = 'visible';
          nav.style.opacity = '1';
          menuOpen = true;
        } else {
          menuBtn.classList.remove('open');
          nav.classList.remove('open');
          document.body.style.overflow = '';
          menuOpen = false;
          
          // Hide menu after transition
          setTimeout(() => {
            if (!nav.classList.contains('open')) {
              nav.style.visibility = 'hidden';
            }
          }, 500);
        }
      });
      
      // Close nav when clicking a link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuBtn.classList.remove('open');
          nav.classList.remove('open');
          document.body.style.overflow = '';
          menuOpen = false;
          
          // Hide menu after transition
          setTimeout(() => {
            if (!nav.classList.contains('open')) {
              nav.style.visibility = 'hidden';
            }
          }, 500);
        });
      });
    }
    
    // Scroll event handler to update header styling
    window.addEventListener('scroll', () => {
      updateHeaderOnScroll();
      updateScrollProgress();
      updateRedLine();
    });
    
    /**
     * Updates header appearance based on scroll position
     */
    function updateHeaderOnScroll() {
      const scrollPosition = window.scrollY;
      const heroSection = document.getElementById('hero');
      
      // Add scrolled class when scrolled down
      if (scrollPosition > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Add past-hero class when scrolled past hero section
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (scrollPosition > heroHeight - 100) {
          header.classList.add('past-hero');
        } else {
          header.classList.remove('past-hero');
        }
      }
    }
    
    /**
     * Updates scroll progress bar width
     */
    function updateScrollProgress() {
      if (scrollProgressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / windowHeight) * 100;
        
        scrollProgressBar.style.width = `${scrollPercentage}%`;
      }
    }
    
    /**
     * Updates red line animation based on scroll position
     */
    function updateRedLine() {
      if (redLine) {
        const scrollPosition = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollPosition > 100) {
          const scrollPercentage = scrollPosition / windowHeight;
          redLine.style.transform = `scaleX(${scrollPercentage})`;
        } else {
          redLine.style.transform = 'scaleX(0)';
        }
      }
    }
    
    // Initialize on page load
    updateHeaderOnScroll();
    updateScrollProgress();
    updateRedLine();
  }
}); 