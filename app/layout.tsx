import { CustomCursorContainer } from '@/components/custom-cursor-container';
import Footer from '@/components/footer';
import { PortfolioSidebar } from '@/components/portfolio-sidebar';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Matthias Etchegaray',
  description: 'Just my projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-muted grid grid-rows-[auto_1fr] max-h-dvh overflow-hidden">
        <TooltipProvider delayDuration={0}>
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
              className="bg-background overflow-y-auto overflow-x-hidden w-full max-h-dvh rounded-tr-2xl rounded-br-2xl rounded-bl-2xl md:rounded-br-none md:rounded-bl-none md:rounded-tr-none rounded-tl-2xl border"
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
