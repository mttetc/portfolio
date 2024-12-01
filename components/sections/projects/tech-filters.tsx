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
import { motion } from 'framer-motion';

export const TechFilters = () => {
  const isDrawerVisible = isMobile || isTablet;
  const activeFilters = useProjectsStore(state => state.activeFilters);
  const toggleFilter = useProjectsStore(state => state.toggleFilter);

  const handleAllClick = useCallback(() => toggleFilter('All'), [toggleFilter]);
  const handleTechClick = useCallback((name: string) => () => toggleFilter(name), [toggleFilter]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const FilterButtons = () => (
    <motion.div
      className="flex flex-wrap gap-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div variants={item}>
        <AllButton isActive={activeFilters.includes('All')} onClick={handleAllClick} />
      </motion.div>
      {TECHNOLOGIES.map(tech => (
        <motion.div key={tech.name} variants={item}>
          <TechButton
            tech={tech}
            isActive={activeFilters.includes(tech.name)}
            onToggle={handleTechClick(tech.name)}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="mb-12">
      {isDrawerVisible ? (
        <Drawer>
          <DrawerTrigger asChild>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full p-3 glass rounded-xl flex items-center justify-between"
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
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <FilterButtons />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <FilterButtons />
      )}
    </div>
  );
};
