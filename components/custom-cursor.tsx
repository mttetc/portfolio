'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 50, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const isInteractive = (element: HTMLElement | null): boolean => {
      if (!element) return false;

      const interactiveTags = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'];
      const isInteractiveTag =
        interactiveTags.includes(element.tagName) || element.closest(interactiveTags.join(','));
      const hasInteractiveRole = element.getAttribute('role') === 'button';

      return !!isInteractiveTag || hasInteractiveRole;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!isClicking) {
        setIsHovering(isInteractive(target));
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setIsHovering(false);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      const target = document.elementFromPoint(cursorX.get(), cursorY.get()) as HTMLElement;
      if (target) {
        setIsHovering(isInteractive(target));
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isClicking]);

  return (
    <motion.div
      className="fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        opacity: isHovering ? 0.8 : 1,
      }}
      transition={{ duration: 0.15 }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  );
}
