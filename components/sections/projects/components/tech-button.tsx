import { TECHNOLOGIES } from '@/constants/technologies';

interface TechButtonProps {
  tech: (typeof TECHNOLOGIES)[0];
  isActive: boolean;
  onToggle: () => void;
}

export const TechButton = ({ tech, isActive, onToggle }: TechButtonProps) => (
  <button
    onClick={onToggle}
    className={`px-2 py-1 rounded-full flex items-center gap-2 bg-muted border`}
    style={{
      borderColor: isActive ? `${tech.color}30` : undefined,
      background: isActive ? `linear-gradient(90deg, ${tech.color}10, ${tech.color}05)` : undefined,
    }}
  >
    <div className="relative">
      <tech.icon size={16} color={tech.color} className={isActive ? 'opacity-100' : 'opacity-70'} />
      <div
        className="absolute inset-0 blur-sm"
        style={{
          backgroundColor: tech.color,
          opacity: isActive ? 0.1 : 0.05,
          transform: 'scale(1.2)',
          borderRadius: '50%',
        }}
      />
    </div>
    <span
      className="text-sm"
      style={{
        color: isActive ? tech.color : undefined,
        textShadow: isActive ? `0 0 10px ${tech.color}20` : undefined,
      }}
    >
      {tech.name}
    </span>
  </button>
);
