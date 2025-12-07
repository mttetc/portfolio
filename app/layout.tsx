import { CustomCursorContainer } from '@/components/custom-cursor-container';
import Footer from '@/components/footer';
import { MobileViewportHandler } from '@/components/mobile-viewport-handler';
import { PortfolioSidebar } from '@/components/portfolio-sidebar';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Portfolio | Matthias Etchegaray',
  description: 'Just my projects',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, 'h-full')}>
      <body className="bg-muted grid grid-rows-[auto_1fr] h-full overflow-hidden">
        <TooltipProvider delayDuration={0}>
          <MobileViewportHandler />
          <CustomCursorContainer />
          <ScrollToTop />
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <ScrollProgress />

          <div className="flex flex-col md:flex-row overflow-hidden">
            <PortfolioSidebar />
            <main
              id="scroll-container"
              className="bg-background overflow-y-auto overflow-x-hidden w-full h-full max-h-dvh rounded-tr-2xl rounded-br-2xl rounded-bl-2xl md:rounded-br-none md:rounded-bl-none md:rounded-tr-none rounded-tl-2xl border"
            >
              {children}
            </main>
          </div>
          <Footer />

          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
