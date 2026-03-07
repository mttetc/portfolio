'use client';

import { Technology } from '@/constants/technologies';
import { useThemeStore } from '@/lib/stores/use-theme-store';

interface TechButtonProps {
  tech: Technology;
  isActive: boolean;
  onToggle: () => void;
}

function getVisibleColor(hex: string, isDark: boolean): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (isDark && brightness < 60) return '#ffffff';
  if (!isDark && brightness > 240) return '#14b8a6';
  return hex;
}

export const TechButton = ({ tech, isActive, onToggle }: TechButtonProps) => {
  const theme = useThemeStore(s => s.theme);
  const color = getVisibleColor(tech.color, theme === 'dark');
  return (
    <button
      type="button"
      onClick={onToggle}
      className="px-2 py-1 rounded-full flex items-center gap-2 bg-muted border"
      style={{
        borderColor: isActive ? `${color}30` : undefined,
      }}
    >
      <tech.icon size={16} color={color} className={isActive ? 'opacity-100' : 'opacity-50'} />
      <span
        className="text-sm"
        style={{ color: isActive ? color : undefined }}
      >
        {tech.name}
      </span>
    </button>
  );
};
