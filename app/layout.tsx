import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import ClientLayout from '@/components/client-layout';

export const metadata: Metadata = {
  title: 'Portfolio | Matthias Etchegaray',
  description: 'Just my projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-muted overflow-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
