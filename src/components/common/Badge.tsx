import React from 'react';
import { classNames } from '../../utils/helpers';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-white/50 backdrop-blur-sm text-neutral-800 border-neutral-200',
    success: 'bg-green-500/10 backdrop-blur-sm text-green-700 border-green-200/50',
    warning: 'bg-amber-500/10 backdrop-blur-sm text-amber-700 border-amber-200/50',
    danger: 'bg-red-500/10 backdrop-blur-sm text-red-700 border-red-200/50',
    info: 'bg-primary-500/10 backdrop-blur-sm text-primary-700 border-primary-200/50',
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px] rounded-full uppercase tracking-widest font-bold',
    md: 'px-4 py-1.5 text-xs rounded-full uppercase tracking-widest font-bold',
    lg: 'px-5 py-2 text-sm rounded-full uppercase tracking-widest font-bold',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center border border-solid transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
