'use client';

import { cn } from '@/lib/utils';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ScrollVelocityProps {
  children: ReactNode;
  default_velocity?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocity({ children, default_velocity = 5, className }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * default_velocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div className={cn('flex w-max', className)} style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
