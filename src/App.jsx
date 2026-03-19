import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformsTicker from './components/PlatformsTicker';
import WorkflowsGrid from './components/WorkflowsGrid';
import WhatIAutomate from './components/WhatIAutomate';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformsTicker />
        <WorkflowsGrid />
        <WhatIAutomate />
        <HowItWorks />
        <CaseStudies />
        <Testimonials />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}