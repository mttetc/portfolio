import { TECHNOLOGIES } from '@/constants/technologies';
import { AllButton } from './all-button';
import { TechButton } from './tech-button';
import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { useCallback } from 'react';
import { FiFilter } from 'react-icons/fi';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { isMobile, isTablet } from 'react-device-detect';

export const TechFilters = () => {
  const isDrawerVisible = isMobile || isTablet;
  const activeFilters = useProjectsStore(state => state.activeFilters);
  const toggleFilter = useProjectsStore(state => state.toggleFilter);

  const handleAllClick = useCallback(() => toggleFilter('All'), [toggleFilter]);
  const handleTechClick = useCallback((name: string) => () => toggleFilter(name), [toggleFilter]);

  return (
    <div className="mb-12">
      {isDrawerVisible ? (
        <Drawer>
          <DrawerTrigger asChild>
            <button className="w-full p-3 glass rounded-xl flex items-center justify-between">
              <span>Filter Projects</span>
              <FiFilter className="w-5 h-5" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Filter Projects</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="flex flex-wrap gap-4">
                  <AllButton isActive={activeFilters.includes('All')} onClick={handleAllClick} />
                  {TECHNOLOGIES.map(tech => (
                    <TechButton
                      key={tech.name}
                      tech={tech}
                      isActive={activeFilters.includes(tech.name)}
                      onToggle={handleTechClick(tech.name)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <AllButton isActive={activeFilters.includes('All')} onClick={handleAllClick} />
          {TECHNOLOGIES.map(tech => (
            <TechButton
              key={tech.name}
              tech={tech}
              isActive={activeFilters.includes(tech.name)}
              onToggle={handleTechClick(tech.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
