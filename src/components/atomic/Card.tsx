import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, onClick, className = '', padding = 'md' }: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const Component = onClick ? motion.div : 'div';
  const interactiveProps = onClick ? {
    whileTap: { scale: 0.98 },
    className: `cursor-pointer ${className}`,
  } : { className };
  
  return (
    <Component
      {...interactiveProps}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </Component>
  );
}
