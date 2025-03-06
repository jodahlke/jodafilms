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
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 