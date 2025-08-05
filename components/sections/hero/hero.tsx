import TypingAnimation from '@/components/typing-animation';
import { FIRST_NAME } from '@/constants/names';
import { HeroCodeBlock } from './hero-code-block';
import { HeroAvatar } from './hero-avatar';
import { HeroInteractive } from './hero-interactive';

const texts = [
  'Frontend Developer ✨',
  'UI/UX Enthusiast 🎨',
  'React Specialist ⚛️',
  'Performance Optimizer 🚀',
  'Problem Solver 🧩',
  'Lifelong Learner 📚',
  'Team Player 🤝',
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-full p-4 md:p-10 flex items-center justify-center overflow-hidden py-20 lg:py-0 bg-background"
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <HeroAvatar />

            {/* Text Content */}
            <div className="text-center flex flex-col gap-5 w-full">
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Hello 👋, I&apos;m</h2>

              <h1
                id="hero-title"
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-foreground"
                style={{ letterSpacing: '-2px' }}
              >
                {FIRST_NAME}
              </h1>

              <div className="flex items-center justify-center">
                <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-muted-foreground">
                  I&apos;m a <TypingAnimation texts={texts} />
                </p>
              </div>

              <HeroInteractive />
            </div>
          </div>

          {/* Code Block - Right Side */}
          <HeroCodeBlock />
        </div>
      </div>
    </section>
  );
}
