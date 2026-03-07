'use client';

import { Technology } from '@/constants/technologies';
import { useThemeStore } from '@/lib/stores/use-theme-store';

interface TechBadgeProps {
  tech: Technology;
}

function getVisibleColor(hex: string, isDark: boolean): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (isDark && brightness < 80) return '#ffffff';
  if (!isDark && brightness > 200) return '#14b8a6';
  return hex;
}

export const TechBadge = ({ tech }: TechBadgeProps) => {
  const theme = useThemeStore(s => s.theme);
  const Component = tech.icon;
  const color = getVisibleColor(tech.color, theme === 'dark');
  return (
    <span
      role="listitem"
      className="px-3 py-1 text-sm rounded-full bg-muted"
      style={{ color }}
    >
      <span className="flex items-center gap-1.5">
        <Component className="w-4 h-4" aria-hidden="true" />
        {tech.name}
      </span>
    </span>
  );
};

TechBadge.displayName = 'TechBadge';
