'use client';

import { SectionTitle } from '@/components/section-title';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EMAIL, NICKNAME } from '@/constants/names';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { ContactForm } from '../contact-form';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    link: `https://github.com/${NICKNAME}`,
    color: '#6e5494',
    hoverText: 'Check my repos',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    link: `https://linkedin.com/in/${NICKNAME}`,
    color: '#0077b5',
    hoverText: 'Connect with me',
  },
  {
    name: 'Email',
    icon: FiMail,
    link: EMAIL,
    color: '#ea4335',
    hoverText: 'Send me an email',
  },
];

export default function Contact() {
  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Get in Touch" icon="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="prose prose-invert"
            >
              <h3 className="text-2xl font-outfit">Let&apos;s Create Something Amazing Together</h3>
              <p className="text-[hsl(var(--text-secondary))]">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to
                be part of your visions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 text-[hsl(var(--text-secondary))]"
            >
              <FiMapPin className="shrink-0" />
              <span>France</span>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * index,
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 glass interactive rounded-xl"
                        style={{ color: social.color }}
                      >
                        <social.icon size={24} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.hoverText}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
