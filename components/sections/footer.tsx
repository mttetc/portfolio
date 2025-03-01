'use client';

import { FULL_NAME } from '@/constants/names';
import SparklesText from '../ui/sparkles-text';

export default function Footer() {
  return (
    <footer className="py-10 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-center text-sm text-gray-400">
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
            <div className="mt-2">
              {new Date().getFullYear()}{' '}
              <SparklesText
                sparklesCount={3}
                className="text-sm font-light inline"
                text={FULL_NAME}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
