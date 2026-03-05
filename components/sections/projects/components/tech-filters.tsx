'use client';

import { getTechnology, Technology } from '@/constants/technologies';
import { AllButton } from './all-button';
import { TechButton } from './tech-button';
import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useCallback, useMemo, memo } from 'react';
import { FiFilter } from 'react-icons/fi';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { isMobile, isTablet } from 'react-device-detect';
import { motion } from 'motion/react';

const AnimatedAllButton = memo(function AnimatedAllButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <AllButton isActive={isActive} onClick={onClick} />
    </motion.div>
  );
});

const AnimatedTechButton = memo(function AnimatedTechButton({
  tech,
  isActive,
  onToggle,
}: {
  tech: Technology;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <TechButton tech={tech} isActive={isActive} onToggle={onToggle} />
    </motion.div>
  );
});

const FilterButtons = memo(function FilterButtons({
  technologies,
  activeFilters,
  onAllClick,
  onTechClick,
}: {
  technologies: Technology[];
  activeFilters: string[];
  onAllClick: () => void;
  onTechClick: (name: string) => () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <AnimatedAllButton isActive={activeFilters.includes('All')} onClick={onAllClick} />
      {technologies.map(tech => (
        <AnimatedTechButton
          key={tech.name}
          tech={tech}
          isActive={activeFilters.includes(tech.name)}
          onToggle={onTechClick(tech.name)}
        />
      ))}
    </div>
  );
});

export const TechFilters = () => {
  const isDrawerVisible = isMobile || isTablet;
  const activeFilters = useProjectsStore(state => state.activeFilters);
  const toggleFilter = useProjectsStore(state => state.toggleFilter);
  const projects = useProjectsStore(state => state.projects);

  const technologies = useMemo(() => {
    const techSet = new Set<string>(projects.flatMap(p => p.stack));
    return Array.from(techSet)
      .sort((a, b) => a.localeCompare(b))
      .map(getTechnology);
  }, [projects]);

  const handleAllClick = useCallback(() => toggleFilter('All'), [toggleFilter]);
  const handleTechClick = useCallback((name: string) => () => toggleFilter(name), [toggleFilter]);

  return (
    <div className="mb-12">
      {isDrawerVisible ? (
        <Drawer>
          <DrawerTrigger asChild>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full p-3 bg-muted border rounded-xl flex items-center justify-between"
            >
              <span>Filter Projects</span>
              <FiFilter className="w-5 h-5" />
            </motion.button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Filter Projects</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto max-h-[60dvh]">
                <FilterButtons
                  technologies={technologies}
                  activeFilters={activeFilters}
                  onAllClick={handleAllClick}
                  onTechClick={handleTechClick}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <FilterButtons
          technologies={technologies}
          activeFilters={activeFilters}
          onAllClick={handleAllClick}
          onTechClick={handleTechClick}
        />
      )}
    </div>
  );
};
