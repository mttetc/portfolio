import { SectionTitle } from '@/components/section-title';
import { getProjects } from '@/lib/github';
import { ProjectsClient } from './projects-client';

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20 p-4 md:p-10 min-h-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="My Work" title="Projects" />
        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
