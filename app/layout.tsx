import { GeistSans } from 'geist/font/sans';
import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { CustomCursor } from '@/components/custom-cursor';
import { ScrollProgress } from '@/components/scroll-progress';
import { ThemeSwitcher } from '@/components/theme-switcher';
import ScrollToTop from '@/components/scroll-to-top';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
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
  return (
    <html lang="en" className={`${GeistSans.variable} ${outfit.variable}`}>
      <body>
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <ThemeSwitcher />
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
