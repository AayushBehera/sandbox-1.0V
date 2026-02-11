import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, ButtonProps } from './Button';

export interface AnimatedButtonProps extends ButtonProps {
  magnetic?: boolean;
  ripple?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  magnetic = true,
  ripple = false,
  className = '',
  ...props
}) => {
  const [rippleEffect, setRippleEffect] = React.useState<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !reduceMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRippleEffect({ x, y });
      setTimeout(() => setRippleEffect(null), 450);
    }
    props.onClick?.(e);
  };

  return (
    <motion.div
      whileHover={magnetic && !reduceMotion ? { scale: 1.02, y: -1 } : {}}
      whileTap={reduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
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
            className="absolute rounded-full bg-white/25"
            initial={{ width: 0, height: 0, x: rippleEffect.x, y: rippleEffect.y }}
            animate={{ width: 240, height: 240, x: rippleEffect.x - 120, y: rippleEffect.y - 120, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </Button>
    </motion.div>
  );
};
