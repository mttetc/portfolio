'use client';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { useState, createContext, useContext, useCallback, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <motion.div
        className={cn(
          'h-full px-4 py-4 hidden md:flex md:flex-col bg-muted w-[60px] flex-shrink-0',
          className
        )}
        animate={{
          width: animate ? (open ? '200px' : '60px') : '60px',
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-muted w-full'
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2 className="text-foreground" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed h-full w-full inset-0 bg-background p-10 z-[100] flex flex-col justify-between',
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-foreground"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = memo(
  ({ link, className, ...props }: { link: Links; className?: string; props?: LinkProps }) => {
    const { open, setOpen, animate } = useSidebar();

    // Handle hash links for smooth scrolling in the correct container
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        // close on click
        setOpen(false);
        // Only handle hash links
        if (link.href.startsWith('#')) {
          e.preventDefault();
          const targetId = link.href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            // Get the scroll container
            const scrollContainer = document.getElementById('scroll-container');
            if (scrollContainer) {
              // Get the position of the target element relative to the scroll container
              const containerRect = scrollContainer.getBoundingClientRect();
              const targetRect = targetElement.getBoundingClientRect();
              const relativeTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;

              // Scroll to the target element
              scrollContainer.scrollTo({
                top: relativeTop,
                behavior: 'smooth',
              });
            }
          }
        }
      },
      [link.href, setOpen]
    );

    return (
      <Link
        href={link.href}
        onClick={handleClick}
        className={cn('flex items-center justify-start gap-2 group/sidebar py-2', className)}
        target={link.href.startsWith('http') ? '_blank' : undefined}
        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre overflow-hidden"
        >
          {link.label}
        </motion.span>
      </Link>
    );
  }
);

SidebarLink.displayName = 'SidebarLink';
