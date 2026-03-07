'use client';

import { motion, useInView } from 'motion/react';
import { memo, useRef } from 'react';
import { ProjectsGrid } from './components/projects-grid';
import { TechFilters } from './components/tech-filters';
import { Project } from '@/lib/schemas/projects';
import { useProjectsStore } from '@/lib/stores/use-projects-store';

interface ProjectsClientProps {
  projects: Project[];
}

export const ProjectsClient = memo(function ProjectsClient({ projects }: ProjectsClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const initialized = useRef(false);

  if (!initialized.current) {
    useProjectsStore.getState().setProjects(projects);
    initialized.current = true;
  }

  return (
    <div ref={ref}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TechFilters />
          <ProjectsGrid />
        </motion.div>
      )}
    </div>
  );
});
