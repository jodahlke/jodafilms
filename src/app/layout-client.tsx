"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";

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

    // Prioritize LCP (Largest Contentful Paint) elements
    const linkPrefetch = document.createElement('link');
    linkPrefetch.rel = 'preload';
    linkPrefetch.as = 'image';
    linkPrefetch.href = '/assets/photos/portfolio/R1-05309-0020.jpg';
    document.head.appendChild(linkPrefetch);

  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 