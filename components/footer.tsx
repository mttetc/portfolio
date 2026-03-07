import SparklesText from './ui/sparkles-text';

export default function Footer() {
  return (
    <footer className="py-8 px-6 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-muted-foreground text-sm flex flex-col md:flex-row items-center justify-center gap-1 text-center">
          <div>
            Built with <span className="text-red-400">❤</span> using{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              aria-label="Visit Next.js website"
            >
              <SparklesText
                sparklesCount={4}
                className="text-sm font-light inline"
                text="Next.js"
              />
            </a>{' '}
            and{' '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              aria-label="Visit Tailwind CSS website"
            >
              <SparklesText
                sparklesCount={2}
                className="text-sm font-light inline"
                text="Tailwind CSS"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
