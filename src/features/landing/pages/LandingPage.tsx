'use client';

import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import ChatHero from '../components/ChatHero';
import Footer from '../components/Footer';

const Features = dynamic(() => import('../components/Features'));
const HowItWorks = dynamic(() => import('../components/HowItWorks'));
const Testimonials = dynamic(() => import('../components/Testimonials'));
const Pricing = dynamic(() => import('../components/Pricing'));
const CtaSection = dynamic(() => import('../components/CtaSection'));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ChatHero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
