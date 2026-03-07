import { Project } from '@/lib/schemas/projects';
import { create } from 'zustand';

type MatchMode = 'any' | 'all';

interface ProjectsState {
  projects: Project[];
  activeFilters: string[];
  matchMode: MatchMode;
  filteredProjects: Project[];
  visibleCount: number;
  setProjects: (projects: Project[]) => void;
  toggleFilter: (filter: string) => void;
  toggleMatchMode: () => void;
  showMore: () => void;
  resetCount: () => void;
}

const defaultFilters = ['All'];
const ITEMS_PER_PAGE = {
  mobile: 3,
  desktop: 6,
};

const filterProjects = (projects: Project[], filters: string[], mode: MatchMode) => {
  if (filters.includes('All')) return projects;
  if (mode === 'all') {
    return projects.filter(project => filters.every(f => project.stack.includes(f)));
  }
  return projects.filter(project => project.stack.some(techName => filters.includes(techName)));
};

const getInitialItemCount = () => {
  if (typeof window === 'undefined') return ITEMS_PER_PAGE.desktop;
  return window.innerWidth < 768 ? ITEMS_PER_PAGE.mobile : ITEMS_PER_PAGE.desktop;
};

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeFilters: defaultFilters,
  matchMode: 'all' as MatchMode,
  filteredProjects: [],
  visibleCount: getInitialItemCount(),
  setProjects: (projects: Project[]) =>
    set({
      projects,
      filteredProjects: filterProjects(projects, get().activeFilters, get().matchMode),
    }),
  toggleFilter: (filter: string) => {
    set(state => {
      const { matchMode } = state;
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
          filteredProjects: filterProjects(state.projects, updatedFilters, matchMode),
          visibleCount: getInitialItemCount(),
        };
      }

      const updatedFilters = [...newFilters, filter];
      return {
        activeFilters: updatedFilters,
        filteredProjects: filterProjects(state.projects, updatedFilters, matchMode),
        visibleCount: getInitialItemCount(),
      };
    });
  },
  toggleMatchMode: () => {
    set(state => {
      const newMode = state.matchMode === 'any' ? 'all' : 'any';
      return {
        matchMode: newMode,
        filteredProjects: filterProjects(state.projects, state.activeFilters, newMode),
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
