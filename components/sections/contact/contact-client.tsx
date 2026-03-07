'use client';

import { useLink } from '@react-aria/link';
import { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { EMAIL, NICKNAME } from '@/constants/names';
import { motion, useInView } from 'motion/react';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { ContactForm } from '../../contact-form';

const socialLinks = [
  {
    name: 'GitHub',
    icon: SiGithub,
    link: `https://github.com/${NICKNAME}`,
    color: 'var(--foreground)',
    hoverText: 'Check my repos',
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    link: `https://linkedin.com/in/${NICKNAME}`,
    color: 'var(--foreground)',
    hoverText: 'Connect with me',
  },
  {
    name: 'Email',
    icon: FiMail,
    link: `mailto:${EMAIL}`,
    color: 'var(--foreground)',
    hoverText: 'Send me an email',
  },
];

export function ContactClient() {
  const githubRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

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
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
      {isInView && (
        <>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold">Let&apos;s work together</h3>
              <p className="text-muted-foreground leading-relaxed">
                Have a project in mind? I&apos;d love to hear about it. Whether it&apos;s a full
                web app, a creative landing page, or an AI-powered experience — let&apos;s bring
                your vision to life.
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${EMAIL}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <FiMail size={20} aria-hidden="true" />
                </div>
                <span className="text-text-secondary">{EMAIL}</span>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <FiMapPin size={20} aria-hidden="true" />
                </div>
                <span className="text-text-secondary">France</span>
              </motion.div>
            </div>

            <div className="flex gap-3">
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
                        className="block p-3 bg-muted hover:bg-muted/80 transition-colors rounded-xl border !text-muted-foreground hover:!text-primary"
                      >
                        <social.icon size={22} aria-hidden="true" />
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
        </>
      )}
    </div>
  );
}
