"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const { consentStatus, acceptCookies, declineCookies, isConsentBannerVisible } = useCookieConsent();

  // Handle hydration mismatch by rendering only after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until client-side or if banner shouldn't be visible
  if (!isMounted || !isConsentBannerVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900 bg-opacity-95 shadow-lg border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white text-sm md:text-base">
            <p>
              This website uses cookies to enhance your browsing experience and analyze site traffic. 
              By clicking "Accept", you consent to our use of cookies.
              See our <a href="/privacy" className="underline hover:text-gray-300">Privacy Policy</a> for more information.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:bg-gray-800 transition duration-300"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-white text-gray-900 rounded hover:bg-gray-200 transition duration-300"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 