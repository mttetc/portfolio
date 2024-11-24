'use client';

interface TextGradientProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextGradient({ children, className = '' }: TextGradientProps) {
  return (
    <span 
      className={`
        inline-block 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--accent))]
        animate-[gradient_8s_ease-in-out_infinite]
        bg-[length:200%_auto]
        ${className}
      `}
    >
      {children}
    </span>
  );
}