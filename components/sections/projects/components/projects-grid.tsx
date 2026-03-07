'use client';

import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useButton } from '@react-aria/button';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { useMemo, useRef, useState, useCallback } from 'react';
import { ProjectCard } from './project-card';

export const ProjectsGrid = () => {
  const filteredProjects = useProjectsStore(state => state.filteredProjects);
  const visibleCount = useProjectsStore(state => state.visibleCount);
  const showMore = useProjectsStore(state => state.showMore);
  const resetCount = useProjectsStore(state => state.resetCount);
  const activeFilters = useProjectsStore(state => state.activeFilters);
  const showMoreRef = useRef(null);
  const showLessRef = useRef(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;
  const hasExpanded = visibleCount > (typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 6);

  const { buttonProps: showMoreProps } = useButton(
    {
      onPress: showMore,
      'aria-label': `Show ${Math.min(3, remainingCount)} more projects`,
    },
    showMoreRef
  );

  const { buttonProps: showLessProps } = useButton(
    {
      onPress: () => {
        resetCount();
        // Scroll back to projects section
        const projects = document.getElementById('projects');
        const scrollContainer = document.getElementById('scroll-container');
        if (projects && scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const sectionRect = projects.getBoundingClientRect();
          const relativeTop = sectionRect.top - containerRect.top + scrollContainer.scrollTop;
          scrollContainer.scrollTo({ top: relativeTop, behavior: 'smooth' });
        }
      },
      'aria-label': 'Show less projects',
    },
    showLessRef
  );

  const handleMouseLeave = useCallback(() => setHovered(null), []);

  // Only re-key on filter change, NOT on show more/less
  const filterKey = activeFilters.join(',');

  return (
    <div className="space-y-8">
      <LayoutGroup>
        <AnimatePresence mode="wait">
          <motion.div
            key={filterKey}
            aria-label="Projects grid"
            onMouseLeave={handleMouseLeave}
            className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  layout
                  className="break-inside-avoid mb-4 sm:mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    layout: { duration: 0.3, type: 'spring', bounce: 0.1 },
                  }}
                  onMouseEnter={() => setHovered(index)}
                >
                  <ProjectCard
                    project={project}
                    hovered={hovered === index}
                    dimmed={hovered !== null && hovered !== index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      <div className="flex justify-center gap-4">
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              {...showMoreProps}
              ref={showMoreRef}
              className="px-6 sm:px-8 py-3 rounded-full text-primary font-semibold hover:bg-primary/10 transition-colors"
              style={{ border: '1px solid var(--primary)' }}
            >
              Show More
            </button>
          </motion.div>
        )}
        {hasExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              {...showLessProps}
              ref={showLessRef}
              className="px-6 sm:px-8 py-3 rounded-full text-muted-foreground font-semibold hover:bg-muted transition-colors"
              style={{ border: '1px solid var(--border)' }}
            >
              Show Less
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
