import { TECHNOLOGIES } from '@/constants/technologies';

interface TechButtonProps {
  tech: (typeof TECHNOLOGIES)[0];
  isActive: boolean;
  onToggle: () => void;
}

export const TechButton = ({ tech, isActive, onToggle }: TechButtonProps) => (
  <button
    onClick={onToggle}
    className={`
      px-4 py-2 rounded-full flex items-center gap-2 
      transition-all duration-200 ease-out
      hover:scale-[1.02] active:scale-[0.98]
      ${isActive ? 'glass border' : 'glass'}
    `}
    style={{
      borderColor: isActive ? `${tech.color}30` : undefined,
      background: isActive ? `linear-gradient(90deg, ${tech.color}10, ${tech.color}05)` : undefined,
    }}
  >
    <div className="relative">
      <tech.icon
        size={20}
        color={tech.color}
        className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
      />
      <div
        className="absolute inset-0 blur-sm transition-opacity"
        style={{
          backgroundColor: tech.color,
          opacity: isActive ? 0.1 : 0.05,
          transform: 'scale(1.2)',
          borderRadius: '50%',
        }}
      />
    </div>
    <span
      style={{
        color: isActive ? tech.color : undefined,
        textShadow: isActive ? `0 0 10px ${tech.color}20` : undefined,
      }}
    >
      {tech.name}
    </span>
  </button>
);
