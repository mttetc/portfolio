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
        px-2 py-1 rounded-full text-sm border
        ${isActive ? 'bg-primary text-white' : 'bg-primary/30'}
      `}
    >
      All
    </button>
  );
};
