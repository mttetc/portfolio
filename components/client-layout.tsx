'use client';

import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { isMobile, isTablet } from 'react-device-detect';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [hasCustomCursor, setHasCustomCursor] = useState(false);

  useEffect(() => {
    const isMobileDevice = isMobile || isTablet;
    const isSmallScreen = window.innerWidth <= 1024;
    setHasCustomCursor(!isMobileDevice && !isSmallScreen);

    const handleResize = () => {
      setHasCustomCursor(!isMobileDevice && window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {hasCustomCursor && <CustomCursor />}
      <ScrollProgress />
      <ScrollToTop />
      <ThemeSwitcher />
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      <Toaster />
    </>
  );
}
