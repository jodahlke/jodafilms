"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentStatus = 'accepted' | 'declined' | 'pending';

interface CookieConsentContextType {
  consentStatus: ConsentStatus;
  acceptCookies: () => void;
  declineCookies: () => void;
  resetConsent: () => void;
  isConsentBannerVisible: boolean;
}

// Default context value to avoid null checks
const defaultContextValue: CookieConsentContextType = {
  consentStatus: 'pending',
  acceptCookies: () => {},
  declineCookies: () => {},
  resetConsent: () => {},
  isConsentBannerVisible: false
};

const CookieConsentContext = createContext<CookieConsentContextType>(defaultContextValue);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');
  const [isConsentBannerVisible, setIsConsentBannerVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem('cookieConsent');
      
      if (storedConsent === 'true') {
        setConsentStatus('accepted');
      } else if (storedConsent === 'false') {
        setConsentStatus('declined');
      } else {
        // If no consent is stored, show the banner after a short delay
        const timer = setTimeout(() => {
          setIsConsentBannerVisible(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'true');
      localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
      setConsentStatus('accepted');
      setIsConsentBannerVisible(false);
    }
    // Here you could initialize analytics or other cookie-dependent services
  };

  const declineCookies = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'false');
      localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
      setConsentStatus('declined');
      setIsConsentBannerVisible(false);
    }
    // Here you could disable any tracking or non-essential cookies
  };

  const resetConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cookieConsent');
      localStorage.removeItem('cookieConsentTimestamp');
      setConsentStatus('pending');
      setIsConsentBannerVisible(true);
    }
  };

  // Don't render anything on server-side to prevent hydration errors
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consentStatus,
        acceptCookies,
        declineCookies,
        resetConsent,
        isConsentBannerVisible
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
} 