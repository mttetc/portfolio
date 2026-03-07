'use client';

import { getTechnology } from '@/constants/technologies';
import { Project } from '@/lib/schemas/projects';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { TechBadge } from './tech-badge';

interface ProjectCardProps {
  project: Project;
  hovered: boolean;
  dimmed: boolean;
}

const isPlaceholder = (src: string | { src: string }) => {
  const s = typeof src === 'string' ? src : src.src;
  return s.startsWith('data:');
};

export const ProjectCard = memo(({ project, hovered, dimmed }: ProjectCardProps) => {
  const hasImage = !isPlaceholder(project.image);

  const techBadges = useMemo(
    () =>
      project.stack
        .slice(0, 6)
        .map(getTechnology)
        .map(tech => <TechBadge key={tech.name} tech={tech} onDark={hasImage} />),
    [project.stack, hasImage]
  );

  const actionButtons = (
    <div
      className="absolute top-3 right-3 flex gap-2 z-20 transition-opacity duration-200"
      style={{ opacity: hovered ? 1 : 0 }}
    >
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm !text-white hover:bg-black/70 transition-colors"
          aria-label={`View ${project.name} source code on GitHub`}
        >
          <SiGithub className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/50 backdrop-blur-sm !text-white hover:bg-black/70 transition-colors"
          aria-label={`Visit ${project.name} live site`}
        >
          <FiExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <article
      aria-labelledby={`project-${project.name}`}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 border ${hasImage ? 'bg-black border-white/10' : 'bg-card border-border'}`}
      style={{
        opacity: dimmed ? 0.7 : 1,
        filter: dimmed ? 'blur(1px)' : 'none',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {hasImage ? (
        <div className="flex flex-col">
          {/* Image — natural height */}
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            width={600}
            height={600}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100dvw, (max-width: 1200px) 50dvw, 33dvw"
            loading="lazy"
            placeholder="blur"
          />

          {/* Gradient bridge between image and content */}
          <div className="-mt-24 h-24 relative z-[1]" style={{ background: 'linear-gradient(to bottom, transparent 0%, black 100%)' }} />

          {/* Content on solid black */}
          <div className="bg-black px-4 sm:px-5 pb-4 sm:pb-5 space-y-2 relative z-[1]">
            <h3
              id={`project-${project.name}`}
              className="text-lg font-bold text-white"
            >
              {project.name}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-5">
              {project.description}
            </p>
            <div
              className="flex flex-wrap gap-1.5 pt-1"
              role="list"
              aria-label={`Technologies used in ${project.name}`}
            >
              {techBadges}
            </div>
          </div>

          {actionButtons}
        </div>
      ) : (
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3
              id={`project-${project.name}`}
              className="text-lg font-bold text-foreground"
            >
              {project.name}
            </h3>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-muted border border-border !text-muted-foreground hover:!text-foreground transition-colors"
                  aria-label={`View ${project.name} source code on GitHub`}
                >
                  <SiGithub className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-muted border border-border !text-muted-foreground hover:!text-foreground transition-colors"
                  aria-label={`Visit ${project.name} live site`}
                >
                  <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-5">
            {project.description}
          </p>
          <div
            className="flex flex-wrap gap-1.5 pt-1"
            role="list"
            aria-label={`Technologies used in ${project.name}`}
          >
            {techBadges}
          </div>
        </div>
      )}
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';
