'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiCode, FiMail, FiUser } from 'react-icons/fi';

interface SectionTitleProps {
  title: string;
  icon: 'projects' | 'about' | 'contact';
}

const icons: Record<string, IconType> = {
  projects: FiCode,
  about: FiUser,
  contact: FiMail,
};

export function SectionTitle({ title, icon }: SectionTitleProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8"
    >
      <div className="p-3 glass rounded-xl">
        <Icon className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold">{title}</h2>
    </motion.div>
  );
}
