import { PROJECTS } from '@/constants/projects';
import { TECHNOLOGIES } from '@/constants/technologies';
import { motion } from 'motion/react';
import Image from 'next/image';
import { memo, useMemo, useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { TechBadge } from './tech-badge';
import { useButton } from '@react-aria/button';

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const techMap = useMemo(() => new Map(TECHNOLOGIES.map(tech => [tech.name, tech])), []);
  const techBadges = useMemo(
    () =>
      project.stack
        .map(techName => techMap.get(techName))
        .filter((tech): tech is (typeof TECHNOLOGIES)[0] => !!tech)
        .map(tech => <TechBadge key={tech.name} tech={tech} />),
    [project.stack, techMap]
  );

  const githubRef = useRef(null);
  const liveRef = useRef(null);

  const { buttonProps: githubProps } = useButton(
    {
      onPress: () => window.open(project.github, '_blank'),
      'aria-label': `View ${project.name} source code on GitHub`,
    },
    githubRef
  );

  const { buttonProps: liveProps } = useButton(
    {
      onPress: () => window.open(project.url, '_blank'),
      'aria-label': `Visit ${project.name} live site`,
    },
    liveRef
  );

  return (
    <motion.article
      aria-labelledby={`project-${project.name}`}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.2 }}
      className="gradient-border group h-full"
    >
      <div className="p-6 glass animated h-full flex flex-col will-change-transform">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-[hsl(var(--adaptive-primary)_/_0.1)]">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            className="object-cover will-change-transform transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.name === 'Quaestio'}
            loading={project.name === 'Quaestio' ? 'eager' : 'lazy'}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-black/30 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.github && (
              <button
                {...githubProps}
                ref={githubRef}
                className="p-2 bg-white/10 rounded-full hover:scale-105 active:scale-95 transition-transform"
                aria-label={`View ${project.name} source code on GitHub`}
              >
                <SiGithub className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
            {project.url && (
              <button
                {...liveProps}
                ref={liveRef}
                className="p-2 glass rounded-full hover:scale-105 active:scale-95 transition-transform"
                aria-label={`Visit ${project.name} live site`}
              >
                <FiExternalLink className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <h3 id={`project-${project.name}`} className="text-2xl font-semibold mb-4">
          {project.name}
        </h3>
        <p className="text-[hsl(var(--text-secondary))] mb-4">{project.description}</p>
        <div
          className="flex flex-wrap gap-2 mt-auto"
          role="list"
          aria-label={`Technologies used in ${project.name}`}
        >
          {techBadges}
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
