'use client';

import TextGradient from '@/components/text-gradient';
import TypingAnimation from '@/components/typing-animation';
import { FIRST_NAME } from '@/constants/names';
import { STACK_SLUGS } from '@/constants/stack-slugs';
import { getCssVar } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import BoxReveal from '../ui/box-reveal';
import Particles from '../ui/particles';
import { useToast } from '@/hooks/use-toast';

const IconCloud = dynamic(() => import('@/components/ui/icon-cloud'), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-square animate-pulse">
      <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20" />
      </div>
    </div>
  ),
});

const texts = [
  'Frontend Developer',
  'UI/UX Enthusiast',
  'React Specialist',
  'Performance Optimizer',
  'Problem Solver',
  'Lifelong Learner',
  'Team Player',
];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Particles color={getCssVar('--primary')} />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <BoxReveal>
              <h2 className="text-xl mb-2">Hello, I&apos;m</h2>
            </BoxReveal>

            <BoxReveal>
              <TextGradient>
                <h1 className="text-7xl font-bold mb-4">{FIRST_NAME}</h1>
              </TextGradient>
            </BoxReveal>

            <BoxReveal>
              <p className="text-2xl text-[hsl(var(--text-primary))] h-8 mb-8">
                I&apos;m a <TypingAnimation texts={texts} />
              </p>
            </BoxReveal>

            <div className="rgb-border inline-block">
              <a
                href="#contact"
                className="px-8 py-3 relative z-10 block glass interactive rounded-full"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square"
          >
            {isInView && <IconCloud iconSlugs={STACK_SLUGS} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
