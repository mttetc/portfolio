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
        bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500
        animate-[gradient_4s_linear_infinite]
        bg-[length:200%_auto]
        ${className}
      `}
    >
      {children}
    </span>
  );
}
