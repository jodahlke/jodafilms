"use client";

import { useState, useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieSettings() {
  const [isMounted, setIsMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { consentStatus, acceptCookies, declineCookies, resetConsent } = useCookieConsent();
  
  useEffect(() => {
    setIsMounted(true);
    
    // Get saved timestamp for last update
    if (typeof window !== 'undefined') {
      const timestamp = localStorage.getItem('cookieConsentTimestamp');
      if (timestamp) {
        try {
          setLastUpdated(new Date(timestamp).toLocaleString());
        } catch (e) {
          setLastUpdated('Invalid date');
        }
      }
    }
  }, []);

  // Don't render until client-side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-gray-900 bg-opacity-95 p-6 rounded-lg border border-gray-700 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Cookie Settings</h2>
      
      <div className="mb-6">
        <p className="text-gray-300 mb-2">
          Current status: 
          <span className={`ml-2 font-medium ${
            consentStatus === 'accepted' ? 'text-green-400' : 
            consentStatus === 'declined' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {consentStatus === 'accepted' ? 'Cookies accepted' : 
             consentStatus === 'declined' ? 'Cookies declined' : 'No preference set'}
          </span>
        </p>
        <p className="text-sm text-gray-400">
          Last updated: {lastUpdated || 'Never'}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input 
            type="radio" 
            id="accept-cookies" 
            name="cookie-preference" 
            checked={consentStatus === 'accepted'}
            onChange={acceptCookies}
            className="mr-3"
          />
          <label htmlFor="accept-cookies" className="text-gray-300">
            <span className="block font-medium">Accept all cookies</span>
            <span className="text-sm text-gray-400">Allow all cookies to be set on your device</span>
          </label>
        </div>
        
        <div className="flex items-center">
          <input 
            type="radio" 
            id="decline-cookies" 
            name="cookie-preference" 
            checked={consentStatus === 'declined'}
            onChange={declineCookies}
            className="mr-3"
          />
          <label htmlFor="decline-cookies" className="text-gray-300">
            <span className="block font-medium">Decline non-essential cookies</span>
            <span className="text-sm text-gray-400">Only allow essential cookies needed for the website to function</span>
          </label>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button
          onClick={resetConsent}
          className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:bg-gray-800 transition duration-300"
        >
          Reset Preferences
        </button>
        <a 
          href="/privacy"
          className="px-4 py-2 text-sm text-blue-400 hover:underline transition duration-300"
        >
          View Privacy Policy
        </a>
      </div>
    </div>
  );
} 