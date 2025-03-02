'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { FIRST_NAME, NICKNAME } from '@/constants/names';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FiBriefcase, FiGithub, FiHome, FiLinkedin, FiMail } from 'react-icons/fi';
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from './ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const sectionLinks = [
  {
    label: 'Hero',
    href: '#hero',
    icon: <FiHome className="h-5 w-5 flex-shrink-0 stroke-[2.5px]" />,
    id: 'hero',
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: <FiBriefcase className="h-5 w-5 flex-shrink-0 stroke-[2.5px]" />,
    id: 'projects',
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: <FiMail className="h-5 w-5 flex-shrink-0 stroke-[2.5px]" />,
    id: 'contact',
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: `https://github.com/${NICKNAME}`,
    icon: <FiGithub className=" h-5 w-5 flex-shrink-0 stroke-[2.5px]" />,
  },
  {
    label: 'LinkedIn',
    href: `https://linkedin.com/in/${NICKNAME}`,
    icon: <FiLinkedin className="h-5 w-5 flex-shrink-0 stroke-[2.5px]" />,
  },
];

export function PortfolioSidebar() {
  const [activeHash, setActiveHash] = useState('');

  // Set up hover behavior and hash tracking
  useEffect(() => {
    // Get initial hash from URL
    const getHashFromUrl = () => {
      const hash = window.location.hash;
      return hash ? hash.replace('#', '') : 'hero';
    };

    // Set initial active hash
    setActiveHash(getHashFromUrl());

    // Find the scrollable container
    const scrollContainer = document.getElementById('scroll-container');

    if (!scrollContainer) {
      console.warn('Scrollable container not found');
      return;
    }

    // Track active section based on scroll position
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'contact'];
      const scrollPosition = scrollContainer.scrollTop + 100;
      let currentSection = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // Get position relative to the scroll container
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeHash) {
        setActiveHash(prevHash => {
          if (prevHash !== currentSection) {
            return currentSection;
          }
          return prevHash;
        });
      }
    };

    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(getHashFromUrl());
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    // Initial check for active section
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <Sidebar animate>
      <SidebarBody className="top-0 justify-between gap-10 h-full border border-t-0 border-r-0 border-l-0">
        <div className="flex flex-col flex-1">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {sectionLinks.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={`px-1 rounded-lg hover:text-primary hover:bg-background/20 ${
                  activeHash === link.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              className="text-primary hover:bg-background/20 px-1 py-2 rounded-lg hover:text-primary"
            />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

const Logo = memo(() => {
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

Logo.displayName = 'Logo';
