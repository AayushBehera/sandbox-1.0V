import React from 'react';
import { motion } from 'framer-motion';

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'from-primary-600 via-secondary-500 to-primary-600',
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
};
