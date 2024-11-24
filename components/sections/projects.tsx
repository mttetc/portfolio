'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BRAND_COLORS } from '@/constants/colors';
import Image from 'next/image';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiPython,
  SiDocker,
  SiGithub,
} from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import { SectionTitle } from '@/components/section-title';

interface Technology {
  name: string;
  slug: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  color: string;
}

const technologies: Technology[] = [
  { name: 'React', slug: 'react', icon: SiReact, color: BRAND_COLORS.react },
  {
    name: 'TypeScript',
    slug: 'typescript',
    icon: SiTypescript,
    color: BRAND_COLORS.typescript,
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    icon: SiNodedotjs,
    color: BRAND_COLORS.nodejs,
  },
  {
    name: 'Next.js',
    slug: 'nextjs',
    icon: SiNextdotjs,
    color: BRAND_COLORS.nextjs,
  },
  {
    name: 'Python',
    slug: 'python',
    icon: SiPython,
    color: BRAND_COLORS.python,
  },
  {
    name: 'Docker',
    slug: 'docker',
    icon: SiDocker,
    color: BRAND_COLORS.docker,
  },
];

interface Project {
  title: string;
  description: string;
  technologies: Technology[];
  image: string;
  github: string;
  link: string;
}

export default function Projects() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['All']));

  const projects: Project[] = [
    {
      title: 'Modern Portfolio',
      description: 'A modern portfolio built with Next.js and TailwindCSS',
      technologies: [
        technologies.find(t => t.name === 'React')!,
        technologies.find(t => t.name === 'TypeScript')!,
        technologies.find(t => t.name === 'Next.js')!,
      ],
      image: '/projects/portfolio.jpg',
      github: 'https://github.com/mttetc/portfolio',
      link: 'https://portfolio.com',
    },
    {
      title: 'Backend API',
      description: 'RESTful API built with Node.js and Express',
      technologies: [
        technologies.find(t => t.name === 'Node.js')!,
        technologies.find(t => t.name === 'TypeScript')!,
      ],
      image: '/projects/api.jpg',
      github: 'https://github.com/mttetc/api',
      link: 'https://api.com',
    },
    {
      title: 'Data Analysis Tool',
      description: 'Python-based data analysis tool',
      technologies: [technologies.find(t => t.name === 'Python')!],
      image: '/projects/data-tool.jpg',
      github: 'https://github.com/mttetc/data-tool',
      link: 'https://data-tool.com',
    },
  ];

  const toggleFilter = (filter: string) => {
    const newFilters = new Set(activeFilters);

    if (filter === 'All') {
      setActiveFilters(new Set(['All']));
      return;
    }

    // Remove 'All' when selecting specific filters
    newFilters.delete('All');

    if (newFilters.has(filter)) {
      newFilters.delete(filter);
      // If no filters left, set back to 'All'
      if (newFilters.size === 0) {
        newFilters.add('All');
      }
    } else {
      newFilters.add(filter);
    }

    setActiveFilters(newFilters);
  };

  const filteredProjects = activeFilters.has('All')
    ? projects
    : projects.filter(project => project.technologies.some(tech => activeFilters.has(tech.slug)));

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Projects" icon="projects" />

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFilter('All')}
            className={`px-4 py-2 rounded-full ${
              activeFilters.has('All')
                ? 'bg-gradient-to-r from-[hsl(var(--adaptive-primary)_/_0.2)] to-[hsl(var(--adaptive-primary)_/_0.1)] border border-[hsl(var(--adaptive-primary)_/_0.3)] text-[hsl(var(--adaptive-primary))]'
                : 'glass'
            }`}
          >
            All
          </motion.button>

          {technologies.map(tech => {
            const Icon = tech.icon;
            const isActive = activeFilters.has(tech.slug);

            return (
              <motion.button
                key={tech.slug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFilter(tech.slug)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  isActive ? 'glass border' : 'glass'
                }`}
                style={{
                  borderColor: isActive ? `${tech.color}30` : undefined,
                  background: isActive
                    ? `linear-gradient(90deg, ${tech.color}10, ${tech.color}05)`
                    : undefined,
                }}
              >
                <div className="relative">
                  <Icon
                    size={20}
                    color={tech.color}
                    className={`transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}
                  />
                  <div
                    className="absolute inset-0 blur-sm transition-opacity"
                    style={{
                      backgroundColor: tech.color,
                      opacity: isActive ? 0.1 : 0.05,
                      transform: 'scale(1.2)',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <span
                  style={{
                    color: isActive ? tech.color : undefined,
                    textShadow: isActive ? `0 0 10px ${tech.color}20` : undefined,
                  }}
                >
                  {tech.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="gradient-border group"
            >
              <div className="p-6 glass animated h-full flex flex-col">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass rounded-full hover:scale-110 transition-transform"
                    >
                      <SiGithub className="w-6 h-6" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass rounded-full hover:scale-110 transition-transform"
                    >
                      <FiExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <p className="text-[hsl(var(--text-secondary))] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map(tech => {
                    const Icon = tech.icon;
                    return (
                      <span
                        key={tech.name}
                        className="px-3 py-1 text-sm rounded-full glass flex items-center gap-2"
                        style={{ color: tech.color }}
                      >
                        <Icon size={16} />
                        {tech.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
