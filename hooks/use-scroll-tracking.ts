'use client';

import { useEffect } from 'react';
import { useScrollStore } from '@/lib/stores/use-scroll-store';

export function useScrollTracking() {
  const { activeHash, setActiveHash } = useScrollStore(state => ({
    activeHash: state.activeHash,
    setActiveHash: state.setActiveHash,
  }));

  useEffect(() => {
    // Get initial hash from URL
    const getHashFromUrl = () => {
      const hash = window.location.hash;
      return hash ? hash.replace('#', '') : 'hero';
    };

    // Set initial active hash
    setActiveHash(getHashFromUrl());

    // Find the scrollable container
    const scrollContainer = document.getElementById('scroll-container');

    if (!scrollContainer) {
      console.warn('Scrollable container not found');
      return;
    }

    // Track active section based on scroll position
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact'];
      const scrollPosition = scrollContainer.scrollTop + 100;
      let currentSection = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // Get position relative to the scroll container
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeHash) {
        setActiveHash(currentSection);
      }
    };

    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(getHashFromUrl());
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    // Initial check for active section
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveHash]);

  return activeHash;
}
