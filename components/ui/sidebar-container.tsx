'use client';

import { useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-provider';
import { useScrollTracking } from '@/hooks/use-scroll-tracking';

interface SidebarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarContainer = ({ children, className, ...props }: SidebarContainerProps) => {
  const { open, setOpen, animate } = useSidebar();

  // Track scroll for the entire sidebar
  useScrollTracking();

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <motion.div
      className={cn(
        'h-full px-4 py-4 hidden md:flex md:flex-col bg-muted w-[60px] flex-shrink-0',
        className
      )}
      animate={{
        width: animate ? (open ? '200px' : '60px') : '60px',
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
};
