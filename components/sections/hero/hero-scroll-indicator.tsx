'use client';

import { useCallback } from 'react';
import { motion } from 'motion/react';
import { PiHandTapLight } from 'react-icons/pi';

export function HeroScrollIndicator() {
  const handleClick = useCallback(() => {
    const projects = document.getElementById('projects');
    const scrollContainer = document.getElementById('scroll-container');
    if (projects && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionRect = projects.getBoundingClientRect();
      const relativeTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: relativeTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to projects"
      className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Mouse icon — desktop only */}
      <span className="text-xs uppercase text-muted-foreground hidden sm:block">
        Scroll
      </span>
      <motion.div
        className="w-5 h-8 rounded-full border border-muted-foreground/30 justify-center pt-2 hidden sm:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-1 h-1.5 rounded-full bg-primary" />
      </motion.div>

      {/* Tap gesture — mobile only */}
      <motion.div
        className="sm:hidden text-muted-foreground"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.45, 0.75], ease: 'easeInOut' }}
      >
        <PiHandTapLight className="w-8 h-8" />
      </motion.div>
    </motion.button>
  );
}
