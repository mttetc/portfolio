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
        bg-linear-to-r from-teal-500 via-teal-400 to-teal-600
        animate-[gradient_4s_linear_infinite]
        bg-[length:200%_auto]
        ${className}
      `}
    >
      {children}
    </span>
  );
}
