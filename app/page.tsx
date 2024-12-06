'use client';

import React from 'react';
import Hero from '@/components/sections/hero';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="relative  mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
