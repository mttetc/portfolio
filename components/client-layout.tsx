'use client';

import { CustomCursor } from '@/components/custom-cursor';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { PortfolioSidebar } from '@/components/portfolio-sidebar';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useDeviceCursor } from '@/hooks/use-device-cursor';
import Footer from './footer';
import { ScrollProgress } from './scroll-progress';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const hasCustomCursor = useDeviceCursor();

  return (
    <>
      {hasCustomCursor && <CustomCursor />}
      <ScrollToTop />
      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>
      <ScrollProgress />
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col h-dvh">
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            <PortfolioSidebar />
            <main
              id="scroll-container"
              className="bg-background w-full h-full overflow-y-auto overflow-x-hidden flex-1 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl md:rounded-br-none md:rounded-bl-none md:rounded-tr-none rounded-tl-2xl overflow-hidden border"
            >
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </TooltipProvider>
      <Toaster />
    </>
  );
}
