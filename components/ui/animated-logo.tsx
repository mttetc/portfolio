'use client';

import { useCallback, memo } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FIRST_NAME } from '@/constants/names';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSidebar } from './sidebar-provider';

export const AnimatedLogo = memo(() => {
  const { open, animate } = useSidebar();

  // Handle hero link click
  const handleHeroClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const heroSection = document.getElementById('hero');

    if (heroSection) {
      // Get the scroll container
      const scrollContainer = document.getElementById('scroll-container');
      if (scrollContainer) {
        // Scroll to the top of the container (hero is at the top)
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <Link
      href="#hero"
      onClick={handleHeroClick}
      className="font-normal flex space-x-3 items-center text-sm py-1 relative z-20"
      as="image"
    >
      <div className="relative w-8 h-8 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-[4px]" />
        <Avatar className="relative h-full w-full">
          <AvatarImage src="/images/avatar.png" alt={`${FIRST_NAME}'s portrait`} />
          <AvatarFallback>{FIRST_NAME.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <motion.span
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: animate ? (open ? 1 : 0) : 0,
          width: animate ? (open ? 'auto' : 0) : 0,
        }}
        transition={{
          opacity: { duration: 0.2 },
          width: { duration: 0.2 },
        }}
        className="font-medium text-foreground whitespace-pre overflow-hidden text-lg"
      >
        {FIRST_NAME}
      </motion.span>
    </Link>
  );
});

AnimatedLogo.displayName = 'AnimatedLogo'; 