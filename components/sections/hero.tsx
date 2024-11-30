'use client';

import TextGradient from '@/components/text-gradient';
import TypingAnimation from '@/components/typing-animation';
import { FIRST_NAME } from '@/constants/names';
import { STACK_SLUGS } from '@/constants/stack-slugs';
import { getCssVar } from '@/lib/utils';
import { useButton } from '@react-aria/button';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import BoxReveal from '../ui/box-reveal';
import Particles from '../ui/particles';

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
  const buttonRef = useRef(null);
  const isInView = useInView(ref, { margin: '-100px' });
  const { buttonProps } = useButton(
    {
      onPress: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
      'aria-label': 'Get in touch - Contact section',
    },
    buttonRef
  );

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20 md:py-0"
    >
      <motion.div
        role="presentation"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Particles color={getCssVar('--primary')} />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            role="contentinfo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <BoxReveal width="100%">
              <h2 className="text-lg md:text-xl mb-2">Hello, I&apos;m</h2>
            </BoxReveal>

            <BoxReveal width="100%">
              <TextGradient>
                <h1 id="hero-title" className="text-5xl md:text-7xl font-bold mb-4">
                  {FIRST_NAME}
                </h1>
              </TextGradient>
            </BoxReveal>

            <BoxReveal width="100%">
              <p className="text-xl md:text-2xl text-[hsl(var(--text-primary))] h-8 mb-8">
                I&apos;m a <TypingAnimation texts={texts} />
              </p>
            </BoxReveal>

            <div className="rgb-border inline-block">
              <button
                {...buttonProps}
                ref={buttonRef}
                className="px-6 md:px-8 py-2.5 md:py-3 relative z-10 block glass interactive rounded-full text-sm md:text-base"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          <motion.div
            role="presentation"
            aria-hidden="true"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square w-full max-w-[300px] md:max-w-[500px] mx-auto"
          >
            {isInView && <IconCloud iconSlugs={STACK_SLUGS} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
