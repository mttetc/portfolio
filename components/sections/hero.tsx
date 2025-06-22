'use client';

import TypingAnimation from '@/components/typing-animation';
import { FIRST_NAME } from '@/constants/names';
import { useButton } from '@react-aria/button';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TypingCodeBlock } from '@/components/typing-code-block';
import avatarImage from '@/public/images/avatar.png';

const texts = [
  'Frontend Developer ✨',
  'UI/UX Enthusiast 🎨',
  'React Specialist ⚛️',
  'Performance Optimizer 🚀',
  'Problem Solver 🧩',
  'Lifelong Learner 📚',
  'Team Player 🤝',
];

const codeString = `// Welcome to my Portfolio! 🚀
import { NextJS, NodeJS, React, TypeScript } from '@/tech-stack';
import { TailwindCSS } from '@/ui-tools';

function createAmazingWebsite() {
  const skills = {
    webDev: [React, NextJS, NodeJS, NestJS, ExpressJS, TypeScript, TailwindCSS],
    aiTools: ["Cursor", "Claude", "GitHub Copilot"]
  };

  return {
    message: "Let's work together!",
    services: ["Web Apps", "Problem Solving", "Team Collaboration", "Fast Learning"],
    contact: "etchegaray.matthias@gmail.com"
  };
};`;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
}

const getContentVariants = (isDesktop: boolean) => ({
  hidden: {
    opacity: 0,
    x: isDesktop ? -20 : 0,
    y: isDesktop ? 0 : 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
});

const getImageVariants = (isDesktop: boolean) => ({
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: isDesktop ? 20 : 0,
    y: isDesktop ? 0 : 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
});

export default function Hero() {
  const ref = useRef(null);
  const contactButtonRef = useRef(null);
  const projectsButtonRef = useRef(null);

  const { buttonProps: contactButtonProps } = useButton(
    {
      onPress: () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          // Get the scroll container
          const scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            // Get the position of the contact section relative to the scroll container
            const containerRect = scrollContainer.getBoundingClientRect();
            const sectionRect = contactSection.getBoundingClientRect();
            const relativeTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop;

            // Scroll to the contact section
            scrollContainer.scrollTo({
              top: relativeTop,
              behavior: 'smooth',
            });
          }
        }
      },
      'aria-label': 'Get in touch - Contact section',
    },
    contactButtonRef
  );

  const { buttonProps: projectsButtonProps } = useButton(
    {
      onPress: () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          // Get the scroll container
          const scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            // Get the position of the projects section relative to the scroll container
            const containerRect = scrollContainer.getBoundingClientRect();
            const sectionRect = projectsSection.getBoundingClientRect();
            const relativeTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop;

            // Scroll to the projects section
            scrollContainer.scrollTo({
              top: relativeTop,
              behavior: 'smooth',
            });
          }
        }
      },
      'aria-label': 'View projects section',
    },
    projectsButtonRef
  );

  const isDesktop = useIsDesktop();

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative min-h-full p-4 md:p-10 flex items-center justify-center overflow-hidden py-20 lg:py-0 bg-background"
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-center gap-6">
            {/* Avatar */}
            <motion.div
              variants={getImageVariants(isDesktop)}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]">
                <div className="absolute inset-0 bg-primary/20 rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src={avatarImage}
                    alt={`${FIRST_NAME}'s portrait`}
                    width={180}
                    height={180}
                    className="object-cover rounded-full w-full h-full"
                    priority
                    sizes="(max-width: 768px) 120px, (max-width: 1200px) 150px, 180px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              variants={getContentVariants(isDesktop)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center flex flex-col gap-5 w-full"
            >
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

              <div className="flex gap-4 mt-4 justify-center">
                <button
                  {...contactButtonProps}
                  ref={contactButtonRef}
                  className="px-6 md:px-8 border py-2.5 md:py-3 relative z-10 block bg-muted rounded-full text-sm md:text-base lg:text-lg xl:text-xl hover:bg-background/80 transition-colors"
                >
                  Get in Touch 📬
                </button>
                <button
                  {...projectsButtonProps}
                  ref={projectsButtonRef}
                  className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-primary text-white text-sm md:text-base lg:text-lg xl:text-xl hover:opacity-90 transition-opacity"
                >
                  View Projects 🚀
                </button>
              </div>
            </motion.div>
          </div>

          {/* Code Block - Right Side */}
          <motion.div
            variants={getImageVariants(isDesktop)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[800px] justify-self-end"
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* Window Controls */}
              <div className="flex items-center gap-2 p-3 bg-[#1e1e2e]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>

              {/* Code Content */}
              <div className="bg-muted">
                <TypingCodeBlock
                  language="typescript"
                  filename="Skills"
                  code={codeString}
                  typingSpeed={60}
                  startDelay={100}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
