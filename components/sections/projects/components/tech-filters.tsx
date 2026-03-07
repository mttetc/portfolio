'use client';

import { getTechnology, Technology } from '@/constants/technologies';
import { AllButton } from './all-button';
import { TechButton } from './tech-button';
import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useCallback, useMemo, memo, useState } from 'react';
import { FiChevronDown, FiFilter } from 'react-icons/fi';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { isMobile, isTablet } from 'react-device-detect';

const TOP_COUNT = 10;

// Priority techs always shown first, in this order
const PRIORITY_TECHS = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js',
  'Express.js', 'Nest.js', 'TailwindCSS', 'AWS',
  'Supabase', 'Zustand', 'Cypress', 'Jest',
];

const MatchModeToggle = memo(function MatchModeToggle() {
  const matchMode = useProjectsStore(state => state.matchMode);
  const toggleMatchMode = useProjectsStore(state => state.toggleMatchMode);

  return (
    <button
      type="button"
      onClick={toggleMatchMode}
      className="px-2 py-1 rounded-full text-sm font-medium transition-colors bg-muted border flex items-center gap-1.5"
    >
      <span
        className="w-3 h-3 rounded-sm border transition-colors flex items-center justify-center"
        style={{
          borderColor: matchMode === 'all' ? 'var(--primary)' : 'var(--border)',
          backgroundColor: matchMode === 'all' ? 'var(--primary)' : 'transparent',
        }}
      >
        {matchMode === 'all' && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-muted-foreground">Match all</span>
    </button>
  );
});

export const TechFilters = () => {
  const isDrawerVisible = isMobile || isTablet;
  const activeFilters = useProjectsStore(state => state.activeFilters);
  const toggleFilter = useProjectsStore(state => state.toggleFilter);
  const projects = useProjectsStore(state => state.projects);
  const [showAll, setShowAll] = useState(false);

  // Priority techs first, then by frequency
  const { topTechs, restTechs } = useMemo(() => {
    const allTechs = new Set<string>(projects.flatMap(p => p.stack));
    const prioritySet = new Set(PRIORITY_TECHS);

    // Priority techs that exist in projects, in defined order
    const priority = PRIORITY_TECHS
      .filter(name => allTechs.has(name))
      .map(getTechnology);

    // Remaining techs sorted by frequency
    const countMap = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.stack) {
        if (!prioritySet.has(t)) countMap.set(t, (countMap.get(t) || 0) + 1);
      }
    }
    const rest = Array.from(countMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => getTechnology(name));

    const fillCount = Math.max(0, TOP_COUNT - priority.length);
    const top = [...priority, ...rest.slice(0, fillCount)];
    const remaining = rest.slice(fillCount);

    return { topTechs: top, restTechs: remaining };
  }, [projects]);

  // Always show active filters even if they're in "rest"
  const visibleTechs = useMemo(() => {
    if (showAll) return [...topTechs, ...restTechs];
    const activeSet = new Set(activeFilters);
    const extraActive = restTechs.filter(t => activeSet.has(t.name));
    return [...topTechs, ...extraActive];
  }, [topTechs, restTechs, showAll, activeFilters]);

  const handleAllClick = useCallback(() => toggleFilter('All'), [toggleFilter]);
  const handleTechClick = useCallback((name: string) => () => toggleFilter(name), [toggleFilter]);

  const filterButtons = (
    <div className="flex flex-wrap gap-2">
      <AllButton isActive={activeFilters.includes('All')} onClick={handleAllClick} />
      <MatchModeToggle />
      {visibleTechs.map(tech => (
        <TechButton
          key={tech.name}
          tech={tech}
          isActive={activeFilters.includes(tech.name)}
          onToggle={handleTechClick(tech.name)}
        />
      ))}
      {restTechs.length > 0 && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="px-2 py-1 rounded-full text-sm text-muted-foreground bg-muted border border-border flex items-center gap-1 hover:text-foreground transition-colors"
        >
          +{restTechs.length} more
          <FiChevronDown className="w-3 h-3" />
        </button>
      )}
      {showAll && (
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className="px-2 py-1 rounded-full text-sm text-muted-foreground bg-muted border border-border hover:text-foreground transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );

  return (
    <div className="mb-12">
      {isDrawerVisible ? (
        <Drawer>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="w-full p-3 bg-muted border rounded-xl flex items-center justify-between"
            >
              <span>Filter Projects</span>
              <FiFilter className="w-5 h-5" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Filter Projects</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto max-h-[60dvh]">
                {filterButtons}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        filterButtons
      )}
    </div>
  );
};
