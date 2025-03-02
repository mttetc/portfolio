import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useButton } from '@react-aria/button';
import { motion, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';

// Lazy load ProjectCard
const LazyProjectCard = dynamic(() => import('./project-card').then(mod => mod.ProjectCard), {
  loading: () => (
    <div className="gradient-border animate-pulse">
      <div className="p-6 bg-muted h-full">
        <div className="w-full h-48 mb-4 rounded-lg bg-[hsl(var(--adaptive-primary)_/_0.1)]" />
        <div className="h-8 w-2/3 mb-4 rounded bg-[hsl(var(--adaptive-primary)_/_0.1)]" />
        <div className="h-20 rounded bg-[hsl(var(--adaptive-primary)_/_0.1)]" />
      </div>
    </div>
  ),
});

export const ProjectsGrid = () => {
  const filteredProjects = useProjectsStore(state => state.filteredProjects);
  const visibleCount = useProjectsStore(state => state.visibleCount);
  const showMore = useProjectsStore(state => state.showMore);
  const buttonRef = useRef(null);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  const { buttonProps } = useButton(
    {
      onPress: showMore,
      'aria-label': `Show ${Math.min(3, remainingCount)} more projects`,
    },
    buttonRef
  );

  return (
    <div className="space-y-8 overflow-hidden">
      <div role="grid" aria-label="Projects grid" className="overflow-hidden">
        <motion.div
          role="row"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-hidden"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map(project => (
              <motion.div
                key={project.name}
                role="gridcell"
                className="h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.15 },
                  layout: { duration: 0.3, type: 'spring', bounce: 0.15 },
                }}
                layout
              >
                <LazyProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasMore && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            {...buttonProps}
            ref={buttonRef}
            className="px-8 py-3 border bg-muted rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Show More
          </button>
        </motion.div>
      )}
    </div>
  );
};
