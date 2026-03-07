'use client';

import { Technology } from '@/constants/technologies';
import { useThemeStore } from '@/lib/stores/use-theme-store';

interface TechBadgeProps {
  tech: Technology;
  onDark?: boolean;
}

function getVisibleColor(hex: string, onDarkBg: boolean): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (onDarkBg && brightness < 60) return '#ffffff';
  if (!onDarkBg && brightness > 240) return '#14b8a6';
  return hex;
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
