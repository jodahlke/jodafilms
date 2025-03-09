"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import Head from 'next/head';
import CookieConsent from "@/components/ui/CookieConsent";
import { CookieConsentProvider } from "@/context/CookieConsentContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

    // Ensure proper mobile viewport rendering
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
    document.head.appendChild(meta);

    // Prevent horizontal overflow
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';

    // Prioritize LCP (Largest Contentful Paint) elements
    const linkPrefetch = document.createElement('link');
    linkPrefetch.rel = 'preload';
    linkPrefetch.as = 'image';
    linkPrefetch.href = '/assets/photos/portfolio/R1-05309-0020.jpg';
    document.head.appendChild(linkPrefetch);
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased w-full overflow-x-hidden`} suppressHydrationWarning>
        <CookieConsentProvider>
          {children}
          <CookieConsent />
        </CookieConsentProvider>
      </body>
    </html>
  );
} 