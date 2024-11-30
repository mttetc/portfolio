import { TECHNOLOGIES } from '@/constants/technologies';
import { memo } from 'react';

interface TechBadgeProps {
  tech: (typeof TECHNOLOGIES)[0];
}

export const TechBadge = ({ tech }: TechBadgeProps) => {
  const Component = tech.icon;
  return (
    <span
      role="listitem"
      className="px-3 py-1 text-sm rounded-full glass"
      style={{ color: tech.color }}
    >
      <span className="flex items-center gap-1.5">
        <Component className="w-4 h-4" aria-hidden="true" />
        {tech.name}
      </span>
    </span>
  );
};

TechBadge.displayName = 'TechBadge';
