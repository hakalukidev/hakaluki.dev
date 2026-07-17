'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MAX_OFFSET = 16;

interface OrbitIconProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function OrbitIcon({ children, title, className }: OrbitIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.2 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const offsetX = ((centerX - event.clientX) / (bounds.width / 2)) * MAX_OFFSET;
    const offsetY = ((centerY - event.clientY) / (bounds.height / 2)) * MAX_OFFSET;

    x.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetX)));
    y.set(Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, offsetY)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      title={title}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
