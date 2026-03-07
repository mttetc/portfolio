'use client';

import { Technology } from '@/constants/technologies';
import { useThemeStore } from '@/lib/stores/use-theme-store';
import { getVisibleColor } from '@/lib/utils/get-visible-color';

interface TechBadgeProps {
  tech: Technology;
  onDark?: boolean;
}

export const TechBadge = ({ tech, onDark }: TechBadgeProps) => {
  const theme = useThemeStore(s => s.theme);
  const isDarkBg = onDark ?? theme === 'dark';
  const color = getVisibleColor(tech.color, isDarkBg);
  return (
    <span
      role="listitem"
      className={`px-2 py-0.5 text-xs rounded-full border ${onDark ? 'bg-white/10 !border-white/5' : 'bg-muted border-border'}`}
      style={{ color }}
    >
      <span className="flex items-center gap-1">
        <tech.icon className="w-3 h-3" aria-hidden="true" />
        {tech.name}
      </span>
    </span>
  );
};

TechBadge.displayName = 'TechBadge';
