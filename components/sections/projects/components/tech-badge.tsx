import { Technology } from '@/constants/technologies';

interface TechBadgeProps {
  tech: Technology;
}

function isColorTooDark(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // Relative luminance threshold
  return (r * 299 + g * 587 + b * 114) / 1000 < 80;
}

export const TechBadge = ({ tech }: TechBadgeProps) => {
  const Component = tech.icon;
  const color = isColorTooDark(tech.color) ? '#ffffff' : tech.color;
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
