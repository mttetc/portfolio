'use client';

import TextGradient from '@/components/text-gradient';
import TypingAnimation from '@/components/typing-animation';
import { FIRST_NAME } from '@/constants/names';
import { STACK_SLUGS } from '@/constants/stack-slugs';
import { getCssVar } from '@/lib/utils';
import { useButton } from '@react-aria/button';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, memo } from 'react';
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

const contentVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

const iconCloudVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    '@media (max-width: 1024px)': {
      x: 0,
      y: -20,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

const IconCloudSection = memo(function IconCloudSection({ isInView }: { isInView: boolean }) {
  return (
    <div
      className="relative aspect-square w-full max-w-[300px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] mx-auto"
      aria-hidden
    >
      <motion.div
        variants={iconCloudVariants}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.3 }}
      >
        {isInView && <IconCloud iconSlugs={STACK_SLUGS} />}
      </motion.div>
    </div>
  );
});

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
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-20 lg:py-0"
    >
      <div className="absolute inset-0" aria-hidden>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            height: '100%',
          }}
        >
          <Particles color={getCssVar('--primary')} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center items-center lg:items-start lg:text-left flex flex-col gap-4"
          >
            <BoxReveal>
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Hello, I&apos;m</h2>
            </BoxReveal>

            <BoxReveal>
              <TextGradient>
                <h1
                  id="hero-title"
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
                >
                  {FIRST_NAME}
                </h1>
              </TextGradient>
            </BoxReveal>

            <BoxReveal>
              <p className="text-xl md:text-1xl lg:text-2xl xl:text-3xl text-[hsl(var(--text-primary))] h-8">
                I&apos;m a <TypingAnimation texts={texts} />
              </p>
            </BoxReveal>

            <div className="rgb-border inline-block mt-4 self-center lg:self-start">
              <button
                {...buttonProps}
                ref={buttonRef}
                className="px-6 md:px-8 py-2.5 md:py-3 relative z-10 block glass interactive rounded-full text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          <IconCloudSection isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
