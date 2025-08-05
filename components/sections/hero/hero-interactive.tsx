'use client';

import { useButton } from '@react-aria/button';
import * as motion from 'motion/react-client';
import { useRef } from 'react';

const getContentVariants = () => ({
  hidden: {
    opacity: 0,
    x: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
});

export function HeroInteractive() {
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

  return (
    <motion.div
      variants={getContentVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex gap-4 mt-4 justify-center"
    >
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
    </motion.div>
  );
}
