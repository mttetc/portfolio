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
      className="relative h-[400px] group overflow-hidden rounded-xl"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Image
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={project.name === 'Quaestio'}
        loading={project.name === 'Quaestio' ? 'eager' : 'lazy'}
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-black/70 dark:bg-black/70 bg-white/80 group-hover:bg-white/60 dark:group-hover:bg-black/50 transition-colors duration-300 z-10" />

      <div className="absolute inset-0 p-6 flex flex-col z-20 dark:text-white text-black">
        <div className="flex justify-end gap-4 mb-auto">
          {project.github && (
            <button
              {...githubProps}
              ref={githubRef}
              className="p-2 bg-black/10 dark:bg-white/10 rounded-full hover:scale-105 active:scale-95 transition-transform"
              aria-label={`View ${project.name} source code on GitHub`}
            >
              <SiGithub className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
          {project.url && (
            <button
              {...liveProps}
              ref={liveRef}
              className="p-2 bg-black/10 dark:bg-white/10 rounded-full hover:scale-105 active:scale-95 transition-transform"
              aria-label={`Visit ${project.name} live site`}
            >
              <FiExternalLink className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-auto">
          <h3 id={`project-${project.name}`} className="text-2xl font-semibold mb-4">
            {project.name}
          </h3>
          <p className="text-black/80 dark:text-white/80 mb-4">{project.description}</p>
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label={`Technologies used in ${project.name}`}
          >
            {techBadges}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
