"use client";

import { useEffect } from "react";
import CookieConsent from "@/components/ui/CookieConsent";
import { CookieConsentProvider } from "@/context/CookieConsentContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Remove the attribute added by browser extensions to prevent hydration mismatch
    document.body.removeAttribute('cz-shortcut-listen');

    // Add font display optimization
    document.documentElement.classList.add('font-optimization');

    // Prioritize LCP (Largest Contentful Paint) elements
    const linkPrefetch = document.createElement('link');
    linkPrefetch.rel = 'preload';
    linkPrefetch.as = 'image';
    linkPrefetch.href = '/assets/photos/portfolio/R1-05309-0020.jpg';
    document.head.appendChild(linkPrefetch);

  }, []);

  return (
    <CookieConsentProvider>
      <div>
        {children}
        <CookieConsent />
      </div>
    </CookieConsentProvider>
  );
} 