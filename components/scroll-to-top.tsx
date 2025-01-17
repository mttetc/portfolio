'use client';

import { motion } from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="fixed bottom-6 right-6 z-50 p-3 glass rounded-full"
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
