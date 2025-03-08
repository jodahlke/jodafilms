import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./layout-client";

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
  return <ClientLayout>{children}</ClientLayout>;
}
