import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Outfit } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/client-layout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
