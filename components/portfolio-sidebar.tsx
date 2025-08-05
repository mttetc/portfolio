import { NICKNAME } from '@/constants/names';
import { FiBriefcase, FiGithub, FiHome, FiLinkedin, FiMail } from 'react-icons/fi';
import { SidebarProvider } from './ui/sidebar-provider';
import { SidebarContainer } from './ui/sidebar-container';
import { MobileSidebar } from './ui/mobile-sidebar';
import { AnimatedLogo } from './ui/animated-logo';
import { AnimatedSidebarLink } from './ui/animated-sidebar-link';

const sectionLinks = [
  {
    label: 'Hero',
    href: '#hero',
    icon: <FiHome className="h-5 w-5 flex-shrink-0 stroke-[1px]" />,
    id: 'hero',
  },
  {
    label: 'Projects',
    href: '#projects',
    icon: <FiBriefcase className="h-5 w-5 flex-shrink-0 stroke-[1px]" />,
    id: 'projects',
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: <FiMail className="h-5 w-5 flex-shrink-0 stroke-[1px]" />,
    id: 'contact',
  },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: `https://github.com/${NICKNAME}`,
    icon: <FiGithub className=" h-5 w-5 flex-shrink-0 stroke-[1px]" />,
  },
  {
    label: 'LinkedIn',
    href: `https://linkedin.com/in/${NICKNAME}`,
    icon: <FiLinkedin className="h-5 w-5 flex-shrink-0 stroke-[1px]" />,
  },
];

export function PortfolioSidebar() {
  return (
    <SidebarProvider>
      <SidebarContainer className="top-0 justify-between gap-10 h-full border border-t-0 border-r-0 border-l-0">
        <div className="flex flex-col">
          <AnimatedLogo />
          <div className="mt-8 flex flex-col gap-2">
            {sectionLinks.map((link, idx) => (
              <AnimatedSidebarLink
                key={idx}
                link={link}
                className="px-1 rounded-lg hover:text-primary hover:bg-background/20"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link, idx) => (
            <AnimatedSidebarLink
              key={idx}
              link={link}
              className="text-primary hover:bg-background/20 px-1 py-2 rounded-lg hover:text-primary"
            />
          ))}
        </div>
      </SidebarContainer>
      <MobileSidebar>
        <div className="flex flex-col">
          <AnimatedLogo />
          <div className="mt-8 flex flex-col gap-2">
            {sectionLinks.map((link, idx) => (
              <AnimatedSidebarLink
                key={idx}
                link={link}
                className="px-1 rounded-lg hover:text-primary hover:bg-background/20"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link, idx) => (
            <AnimatedSidebarLink
              key={idx}
              link={link}
              className="text-primary hover:bg-background/20 px-1 py-2 rounded-lg hover:text-primary"
            />
          ))}
        </div>
      </MobileSidebar>
    </SidebarProvider>
  );
}
