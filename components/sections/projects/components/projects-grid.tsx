'use client';

import { Project } from '@/lib/schemas/projects';
import { useCallback, useState } from 'react';
import { ProjectCard } from './project-card';

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const handleMouseLeave = useCallback(() => setHovered(null), []);

  return (
    <div
      aria-label="Projects grid"
      onMouseLeave={handleMouseLeave}
      className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6"
    >
      {projects.map((project, index) => (
        <div
          key={project.name}
          className="break-inside-avoid mb-4 sm:mb-6"
          onMouseEnter={() => setHovered(index)}
        >
          <ProjectCard
            project={project}
            hovered={hovered === index}
            dimmed={hovered !== null && hovered !== index}
          />
        </div>
      ))}
    </div>
  );
};
