'use client';

import { useInView } from 'motion/react';
import { memo, useRef } from 'react';
import { ProjectsGrid } from './components/projects-grid';
import { TechFilters } from './components/tech-filters';

export const ProjectsClient = memo(function ProjectsClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      {isInView && (
        <>
          <TechFilters />
          <ProjectsGrid />
        </>
      )}
    </div>
  );
});
