'use client';

import { motion, useInView } from 'motion/react';
import { memo, useRef } from 'react';
import { ProjectsGrid } from './components/projects-grid';
import { Project } from '@/lib/schemas/projects';

interface ProjectsClientProps {
  projects: Project[];
}

export const ProjectsClient = memo(function ProjectsClient({ projects }: ProjectsClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProjectsGrid projects={projects} />
        </motion.div>
      )}
    </div>
  );
});
