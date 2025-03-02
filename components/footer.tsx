'use client';

import { FULL_NAME } from '@/constants/names';
import SparklesText from './ui/sparkles-text';

export default function Footer() {
  return (
    <footer className="py-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-muted-foreground text-sm flex flex-col md:flex-row items-center justify-center gap-1 text-center">
          <p>
            Built with <span className="text-red-400">❤</span> using{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Visit Next.js website"
            >
              Next.js
              <span className="sr-only">(opens in new tab)</span>
            </a>{' '}
            and{' '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Visit Tailwind CSS website"
            >
              Tailwind CSS
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </p>
          <div className="hidden md:flex items-center gap-1">
            by
            <SparklesText
              sparklesCount={3}
              className="text-sm font-light inline"
              text={FULL_NAME}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
