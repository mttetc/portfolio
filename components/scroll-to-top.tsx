'use client';

import { motion } from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollContainerRef.current = document.getElementById('scroll-container');
    const node = scrollContainerRef.current;
    if (!node) return;

    const toggleVisibility = () => {
      setIsVisible(node.scrollTop > 500);
    };

    toggleVisibility();
    node.addEventListener('scroll', toggleVisibility);
    return () => node.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const node = scrollContainerRef.current;
    if (!node) return;

    // Use scrollTo instead of scrollIntoView to have better control
    node.scrollTo({
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
