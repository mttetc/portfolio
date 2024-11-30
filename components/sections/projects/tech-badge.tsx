import { TECHNOLOGIES } from '@/constants/technologies';
import { memo } from 'react';

interface TechBadgeProps {
  tech: (typeof TECHNOLOGIES)[0];
}

export const TechBadge = memo(({ tech }: TechBadgeProps) => (
  <span
    className="px-3 py-1 text-sm rounded-full glass flex items-center gap-2"
    style={{ color: tech.color }}
  >
    <tech.icon size={16} />
    {tech.name}
  </span>
));

TechBadge.displayName = 'TechBadge';
