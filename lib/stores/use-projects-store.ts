import { Project } from '@/lib/schemas/projects';
import { create } from 'zustand';

interface ProjectsState {
  projects: Project[];
  activeFilters: string[];
  filteredProjects: Project[];
  visibleCount: number;
  setProjects: (projects: Project[]) => void;
  toggleFilter: (filter: string) => void;
  showMore: () => void;
  resetCount: () => void;
}

const defaultFilters = ['All'];
const ITEMS_PER_PAGE = {
  mobile: 3,
  desktop: 6,
};

const filterProjects = (projects: Project[], filters: string[]) => {
  if (filters.includes('All')) return projects;
  return projects.filter(project => project.stack.some(techName => filters.includes(techName)));
};

const getInitialItemCount = () => {
  if (typeof window === 'undefined') return ITEMS_PER_PAGE.desktop;
  return window.innerWidth < 768 ? ITEMS_PER_PAGE.mobile : ITEMS_PER_PAGE.desktop;
};

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeFilters: defaultFilters,
  filteredProjects: [],
  visibleCount: getInitialItemCount(),
  setProjects: (projects: Project[]) =>
    set({
      projects,
      filteredProjects: filterProjects(projects, get().activeFilters),
    }),
  toggleFilter: (filter: string) => {
    set(state => {
      if (filter === 'All') {
        return {
          activeFilters: defaultFilters,
          filteredProjects: state.projects,
          visibleCount: getInitialItemCount(),
        };
      }

      const newFilters = state.activeFilters.filter(f => f !== 'All');

      if (newFilters.includes(filter)) {
        const updatedFilters = newFilters.filter(f => f !== filter);
        if (updatedFilters.length === 0) {
          return {
            activeFilters: defaultFilters,
            filteredProjects: state.projects,
            visibleCount: getInitialItemCount(),
          };
        }
        return {
          activeFilters: updatedFilters,
          filteredProjects: filterProjects(state.projects, updatedFilters),
          visibleCount: getInitialItemCount(),
        };
      }

      const updatedFilters = [...newFilters, filter];
      return {
        activeFilters: updatedFilters,
        filteredProjects: filterProjects(state.projects, updatedFilters),
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
