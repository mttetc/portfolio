'use client';

import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps = {}) {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Find the custom scrollable container
    const container = document.getElementById('scroll-container') as HTMLElement;
    if (container) {
      setScrollContainer(container);
      containerRef.current = container;
    }
  }, []);

  const { scrollYProgress } = useScroll(
    scrollContainer
      ? {
          container: containerRef,
        }
      : {}
  );

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      ref={progressRef}
      className={cn(
        'fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] origin-left z-50',
        className
      )}
      style={{ scaleX }}
    />
  );
}
