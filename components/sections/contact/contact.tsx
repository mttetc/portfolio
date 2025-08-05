import { SectionTitle } from '@/components/section-title';
import { ContactClient } from './contact-client';

export default function Contact() {
  return (
    <section id="contact" className="py-20 p-4 md:p-10 min-h-full">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Get in Touch" icon="contact" />
        <ContactClient />
      </div>
    </section>
  );
}
