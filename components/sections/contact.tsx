'use client';

import { useLink } from '@react-aria/link';
import { useRef } from 'react';
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
    link: `mailto:${EMAIL}`,
    color: '#ea4335',
    hoverText: 'Send me an email',
  },
];

export default function Contact() {
  const githubRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  const { linkProps: githubProps } = useLink(
    {
      href: socialLinks[0].link,
      target: '_blank',
      'aria-label': `Visit my ${socialLinks[0].name} profile`,
    },
    githubRef
  );

  const { linkProps: linkedinProps } = useLink(
    {
      href: socialLinks[1].link,
      target: '_blank',
      'aria-label': `Visit my ${socialLinks[1].name} profile`,
    },
    linkedinRef
  );

  const { linkProps: emailProps } = useLink(
    {
      href: socialLinks[2].link,
      'aria-label': 'Send me an email',
    },
    emailRef
  );

  const linkProps = [githubProps, linkedinProps, emailProps];
  const refs = [githubRef, linkedinRef, emailRef];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Get in Touch" icon="contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
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
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        {...linkProps[index]}
                        ref={refs[index]}
                        rel="noopener noreferrer"
                        className="block p-4 glass interactive rounded-xl"
                        style={{ color: social.color }}
                      >
                        <social.icon size={24} aria-hidden="true" />
                        <span className="sr-only">Visit my {social.name} profile</span>
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
