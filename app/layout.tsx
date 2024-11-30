import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import ScrollToTop from '@/components/scroll-to-top';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { isMobile, isTablet } from 'react-device-detect';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Just my projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasCustomCursor = !isMobile && !isTablet;

  return (
    <html lang="en" className={`${GeistSans.variable} ${outfit.variable}`}>
      <body>
        {hasCustomCursor && <CustomCursor />}
        <ScrollProgress />
        <ScrollToTop />
        <ThemeSwitcher />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
