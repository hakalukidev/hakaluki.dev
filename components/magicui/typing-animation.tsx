'use client';

import { useEffect, useRef, useState } from 'react';
import type { ElementType } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType;
  startOnView?: boolean;
  cursor?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 45,
  delay = 0,
  as: Component = 'span',
  startOnView = false,
  cursor = true,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, { forwardMotionProps: true });

  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setDone(true);
      }
    }, duration);

    return () => clearInterval(typingInterval);
  }, [children, duration, started]);

  return (
    <MotionComponent ref={elementRef} className={cn(className)} {...props}>
      {/* Full text is always present in the markup for crawlers, screen readers, and no-JS clients; the typed-out effect below is purely decorative. */}
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {displayedText}
        {cursor && (
          <span
            className={cn('typing-caret', done && 'typing-caret-done')}
            aria-hidden="true"
          />
        )}
      </span>
    </MotionComponent>
  );
}
