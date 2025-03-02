'use client';

import { motion } from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // Find the scroll container after component mounts
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (container) {
      setScrollContainer(container);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      setIsVisible(scrollContainer.scrollTop > 500);
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);
    return () => scrollContainer.removeEventListener('scroll', toggleVisibility);
  }, [scrollContainer]);

  const scrollToTop = () => {
    if (!scrollContainer) return;

    // Use scrollTo instead of scrollIntoView to have better control
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-14 right-6 z-50 p-3 bg-muted/30 border rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <FiArrowUp className="w-6 h-6" aria-hidden="true" />
      <span className="sr-only">Scroll to top of page</span>
    </motion.button>
  );
}
