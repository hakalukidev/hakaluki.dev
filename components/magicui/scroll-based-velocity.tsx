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
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartBaseX = useRef(0);
  const dragMoved = useRef(false);
  const wheelActive = useRef(false);
  const wheelResumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useAnimationFrame((_t, delta) => {
    if (isDragging.current || wheelActive.current) return;

    let moveBy = directionFactor.current * default_velocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragMoved.current = false;
    dragStartX.current = e.clientX;
    dragStartBaseX.current = baseX.get();
    setIsGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rawDelta = e.clientX - dragStartX.current;
    if (Math.abs(rawDelta) > 5) dragMoved.current = true;
    const width = containerRef.current.offsetWidth || 1;
    const deltaPercent = (rawDelta / width) * 100;
    baseX.set(dragStartBaseX.current - deltaPercent);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsGrabbing(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();

      wheelActive.current = true;
      if (wheelResumeTimeout.current) clearTimeout(wheelResumeTimeout.current);
      wheelResumeTimeout.current = setTimeout(() => {
        wheelActive.current = false;
      }, 300);

      const width = el.offsetWidth || 1;
      baseX.set(baseX.get() + (delta / width) * 100);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelResumeTimeout.current) clearTimeout(wheelResumeTimeout.current);
    };
  }, [baseX]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full overflow-hidden touch-pan-y select-none',
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab',
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
    >
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
