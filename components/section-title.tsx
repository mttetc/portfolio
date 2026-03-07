'use client';

import { motion } from 'motion/react';

interface SectionTitleProps {
  label: string;
  title: string;
}

export function SectionTitle({ label, title }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-4 mb-3">
        <span className="h-px w-8 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          {label}
        </span>
        <span className="h-px w-8 bg-primary" />
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
        {title}
      </h2>
    </motion.div>
  );
}
