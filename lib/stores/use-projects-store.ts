import { PROJECTS } from '@/constants/projects';
import { TECHNOLOGIES } from '@/constants/technologies';
import { create } from 'zustand';

interface ProjectsState {
  activeFilters: string[];
  filteredProjects: typeof PROJECTS;
  visibleCount: number;
  toggleFilter: (filter: string) => void;
  showMore: () => void;
  resetCount: () => void;
}

const defaultFilters = ['All'];
const ITEMS_PER_PAGE = {
  mobile: 3,
  desktop: 6,
};

const filterProjects = (filters: string[]) => {
  if (filters.includes('All')) return PROJECTS;
  return PROJECTS.filter(project => project.stack.some(techName => filters.includes(techName)));
};

const getInitialItemCount = () => {
  if (typeof window === 'undefined') return ITEMS_PER_PAGE.desktop;
  return window.innerWidth < 768 ? ITEMS_PER_PAGE.mobile : ITEMS_PER_PAGE.desktop;
};

export const useProjectsStore = create<ProjectsState>(set => ({
  activeFilters: defaultFilters,
  filteredProjects: PROJECTS,
  visibleCount: getInitialItemCount(),
  toggleFilter: (filter: string) => {
    set(state => {
      if (filter === 'All') {
        return {
          activeFilters: defaultFilters,
          filteredProjects: PROJECTS,
          visibleCount: getInitialItemCount(),
        };
      }

      const newFilters = state.activeFilters.filter(f => f !== 'All');

      if (newFilters.includes(filter)) {
        const updatedFilters = newFilters.filter(f => f !== filter);
        if (updatedFilters.length === 0) {
          return {
            activeFilters: defaultFilters,
            filteredProjects: PROJECTS,
            visibleCount: getInitialItemCount(),
          };
        }
        return {
          activeFilters: updatedFilters,
          filteredProjects: filterProjects(updatedFilters),
          visibleCount: getInitialItemCount(),
        };
      }

      const updatedFilters = [...newFilters, filter];
      return {
        activeFilters: updatedFilters,
        filteredProjects: filterProjects(updatedFilters),
        visibleCount: getInitialItemCount(),
      };
    });
  },
  showMore: () =>
    set(state => ({
      visibleCount:
        state.visibleCount +
        (window.innerWidth < 768 ? ITEMS_PER_PAGE.mobile : ITEMS_PER_PAGE.desktop),
    })),
  resetCount: () =>
    set({
      visibleCount: getInitialItemCount(),
    }),
}));
