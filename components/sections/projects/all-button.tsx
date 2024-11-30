import { useButton } from '@react-aria/button';
import { useRef } from 'react';

interface AllButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export const AllButton = ({ isActive, onClick }: AllButtonProps) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(
    {
      onPress: onClick,
      'aria-pressed': isActive,
      'aria-label': 'Show all projects',
    },
    ref
  );

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`
        px-4 py-2 rounded-full transition-all duration-200 ease-out
        hover:scale-[1.02] active:scale-[0.98]
        ${
          isActive
            ? 'bg-gradient-to-r from-[hsl(var(--adaptive-primary)_/_0.2)] to-[hsl(var(--adaptive-primary)_/_0.1)] border border-[hsl(var(--adaptive-primary)_/_0.3)] text-[hsl(var(--adaptive-primary))]'
            : 'glass'
        }
      `}
    >
      All
    </button>
  );
};
