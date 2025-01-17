'use client';

import { SectionTitle } from '@/components/section-title';
import { useInView } from 'motion/react';
import { memo, useRef } from 'react';
import { ProjectsGrid } from './projects/projects-grid';
import { TechFilters } from './projects/tech-filters';

export default memo(function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="projects" className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Projects" icon="projects" />

        {isInView && (
          <>
            <TechFilters />
            <ProjectsGrid />
          </>
        )}
      </div>
    </section>
  );
});
