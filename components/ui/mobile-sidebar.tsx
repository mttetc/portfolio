'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-provider';

interface MobileSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileSidebar = ({ children, className, ...props }: MobileSidebarProps) => {
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
