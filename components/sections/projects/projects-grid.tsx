import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useButton } from '@react-aria/button';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

// Lazy load ProjectCard
const LazyProjectCard = dynamic(() => import('./project-card').then(mod => mod.ProjectCard), {
  loading: () => (
    <div className="gradient-border animate-pulse">
      <div className="p-6 glass h-full">
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
    <div className="space-y-8">
      <motion.div role="grid" aria-label="Projects grid">
        <motion.div role="row" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(Math.min(visibleCount, filteredProjects.length))].map((_, i) => (
            <motion.div
              key={filteredProjects[i].name}
              role="gridcell"
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <LazyProjectCard project={filteredProjects[i]} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {hasMore && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            {...buttonProps}
            ref={buttonRef}
            className="px-8 py-3 glass rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Show More
          </button>
        </motion.div>
      )}
    </div>
  );
};
