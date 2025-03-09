import React from 'react';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import CookieSettings from '@/components/ui/CookieSettings';

export const metadata = {
  title: 'Cookie Settings | Jonas Dahlke',
  description: 'Manage your cookie preferences for the Jonas Dahlke Filmmaker Portfolio website.',
};

export default function CookieSettingsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-16 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto">
        <Link href="/" className="text-[var(--primary)] mb-10 inline-block hover:underline">
          &larr; Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--primary)]">Cookie Settings</h1>
        
        <div className="mb-10">
          <p className="text-gray-300 mb-6">
            This page allows you to manage your cookie preferences for our website. 
            We use cookies to enhance your browsing experience, analyze website traffic, 
            and personalize content. You can choose to accept or decline cookies at any time.
          </p>
          
          <p className="text-gray-300 mb-6">
            For more information about how we use cookies and your personal data, 
            please read our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
        
        <CookieSettings />
      </div>
      <Footer />
    </main>
  );
} 