import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  const shapes = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-white/40 to-primary-100/30 blur-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
