'use client';

import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import ChatHero from '../components/ChatHero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const ThreeScene = dynamic(() => import('../components/ThreeScene'), {
  ssr: false,
});

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <main>
        <div className="relative">
          <ThreeScene />
          <ChatHero />
        </div>
        <Features />
        <HowItWorks />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
