'use client';

import { Technology } from '@/constants/technologies';
import { useThemeStore } from '@/lib/stores/use-theme-store';
import { getVisibleColor } from '@/lib/utils/get-visible-color';

interface TechButtonProps {
  tech: Technology;
  isActive: boolean;
  onToggle: () => void;
}

export const TechButton = ({ tech, isActive, onToggle }: TechButtonProps) => {
  const theme = useThemeStore(s => s.theme);
  const color = getVisibleColor(tech.color, theme === 'dark');
  return (
    <button
      type="button"
      onClick={onToggle}
      className="px-2 py-1 rounded-full flex items-center gap-2 bg-muted border hover:bg-muted/70 transition-colors"
      style={{
        borderColor: isActive ? `${color}30` : undefined,
      }}
    >
      <tech.icon size={16} color={color} className={isActive ? 'opacity-100' : 'opacity-60'} />
      <span
        className="text-sm"
        style={{ color, opacity: isActive ? 1 : 0.6 }}
      >
        {tech.name}
      </span>
    </button>
  );
};
