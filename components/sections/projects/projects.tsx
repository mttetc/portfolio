import { SectionTitle } from '@/components/section-title';
import { ProjectsClient } from './projects-client';

export default function Projects() {
  return (
    <section id="projects" className="py-20 p-4 md:p-10 min-h-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Projects" icon="projects" />
        <ProjectsClient />
      </div>
    </section>
  );
}
