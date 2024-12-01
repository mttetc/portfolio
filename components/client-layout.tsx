'use client';

import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDeviceCursor } from '@/hooks/use-device-cursor';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const hasCustomCursor = useDeviceCursor();

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
