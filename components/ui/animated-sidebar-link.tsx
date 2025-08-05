'use client';

import { useCallback, memo } from 'react';
import { motion } from 'motion/react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-provider';
import { useScrollStore } from '@/lib/stores/use-scroll-store';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  id?: string;
}

export const AnimatedSidebarLink = memo(
  ({ link, className, ...props }: { link: Links; className?: string; props?: LinkProps }) => {
    const { open, setOpen, animate } = useSidebar();

    const activeHash = useScrollStore(state => state.activeHash);

    // Handle hash links for smooth scrolling in the correct container
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        // close on click
        setOpen(false);
        // Only handle hash links
        if (link.href.startsWith('#')) {
          e.preventDefault();
          const targetId = link.href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            // Get the scroll container
            const scrollContainer = document.getElementById('scroll-container');
            if (scrollContainer) {
              // Get the position of the target element relative to the scroll container
              const containerRect = scrollContainer.getBoundingClientRect();
              const targetRect = targetElement.getBoundingClientRect();
              const relativeTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;

              // Scroll to the target element
              scrollContainer.scrollTo({
                top: relativeTop,
                behavior: 'smooth',
              });
            }
          }
        }
      },
      [link.href, setOpen]
    );

    const isActive = link.id && activeHash === link.id;

    return (
      <Link
        href={link.href}
        onClick={handleClick}
        className={cn(
          'flex items-center justify-start gap-2 group/sidebar py-2',
          isActive ? 'text-primary' : 'text-muted-foreground',
          className
        )}
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre overflow-hidden"
        >
          {link.label}
        </motion.span>
      </Link>
    );
  }
);

AnimatedSidebarLink.displayName = 'AnimatedSidebarLink';
