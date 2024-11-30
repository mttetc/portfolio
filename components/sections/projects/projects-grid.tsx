import { useProjectsStore } from '@/lib/stores/use-projects-store';
import { ProjectCard } from './project-card';
import { useButton } from '@react-aria/button';
import { useRef } from 'react';

export const ProjectsGrid = () => {
  const filteredProjects = useProjectsStore(state => state.filteredProjects);
  const visibleCount = useProjectsStore(state => state.visibleCount);
  const showMore = useProjectsStore(state => state.showMore);
  const buttonRef = useRef(null);

  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  const { buttonProps } = useButton(
    {
      onPress: showMore,
      'aria-label': `Show ${Math.min(3, remainingCount)} more projects`,
    },
    buttonRef
  );

  return (
    <div className="space-y-8">
      <div
        role="grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        aria-label="Projects grid"
      >
        {[...Array(Math.min(visibleCount, filteredProjects.length))].map((_, i) => (
          <ProjectCard key={filteredProjects[i].name} project={filteredProjects[i]} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            {...buttonProps}
            ref={buttonRef}
            className="px-8 py-3 glass rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};
