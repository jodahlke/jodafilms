import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layout-client";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonas Dahlke | Filmmaker & Cinematographer",
  description: "Professional portfolio showcasing cinematic works, films, and commercial projects by Jonas Dahlke, an experienced filmmaker and cinematographer.",
  keywords: "Jonas Dahlke, filmmaker, cinematographer, director, portfolio, videography, film, cinema",
};

// Add cache control headers
export const revalidate = 3600; // Revalidate content every hour

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
