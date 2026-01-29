import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from './Button';

export interface AnimatedButtonProps extends ButtonProps {
  magnetic?: boolean;
  ripple?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  magnetic = true,
  ripple = true,
  className = '',
  ...props
}) => {
  const [rippleEffect, setRippleEffect] = React.useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRippleEffect({ x, y });
      setTimeout(() => setRippleEffect(null), 600);
    }
    props.onClick?.(e);
  };

  return (
    <motion.div
      whileHover={magnetic ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      className="relative inline-block"
    >
      <Button
        {...props}
        className={`relative overflow-hidden ${className}`}
        onClick={handleClick}
      >
        {children}
        {rippleEffect && (
          <motion.span
            className="absolute rounded-full bg-white/30"
            initial={{ width: 0, height: 0, x: rippleEffect.x, y: rippleEffect.y }}
            animate={{ width: 300, height: 300, x: rippleEffect.x - 150, y: rippleEffect.y - 150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </Button>
    </motion.div>
  );
};
