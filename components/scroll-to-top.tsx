'use client';

import { motion, useScroll } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', latest => {
      setShow(latest > 0.1);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 glass rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <FiArrowUp className="w-6 h-6" />
    </motion.button>
  );
}
