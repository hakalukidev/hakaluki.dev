'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ShapeKind = 'quarter' | 'burst' | 'zigzag' | 'squiggle';

type Variant = 'services' | 'projects' | 'about' | 'network' | 'reviews' | 'contact';

interface ShapeConfig {
  shape: ShapeKind;
  color: string;
  size: number;
  depth: number;
}

const VARIANT_CONFIG: Record<Variant, ShapeConfig[]> = {
  services: [
    { shape: 'burst', color: '#fb5607', size: 1, depth: 0.9 },
    { shape: 'quarter', color: '#fb923c', size: 0.85, depth: 0.5 },
    { shape: 'zigzag', color: '#2a9d8f', size: 0.8, depth: 1.2 },
    { shape: 'squiggle', color: '#f472b6', size: 0.85, depth: 0.7 },
    { shape: 'burst', color: '#ffb703', size: 0.6, depth: 1 },
  ],
  projects: [
    { shape: 'squiggle', color: '#8338ec', size: 1, depth: 0.8 },
    { shape: 'zigzag', color: '#2a9d8f', size: 1, depth: 1.1 },
    { shape: 'quarter', color: '#3a86ff', size: 0.8, depth: 0.5 },
    { shape: 'burst', color: '#8ac926', size: 0.7, depth: 1 },
    { shape: 'squiggle', color: '#2a9d8f', size: 0.6, depth: 0.65 },
  ],
  about: [
    { shape: 'quarter', color: '#f472b6', size: 0.9, depth: 0.5 },
    { shape: 'zigzag', color: '#06d6a0', size: 0.9, depth: 1.15 },
    { shape: 'burst', color: '#3a86ff', size: 0.7, depth: 0.85 },
    { shape: 'squiggle', color: '#fb5607', size: 0.85, depth: 0.7 },
    { shape: 'quarter', color: '#06d6a0', size: 0.55, depth: 1 },
  ],
  network: [
    { shape: 'burst', color: '#e63946', size: 1, depth: 0.9 },
    { shape: 'squiggle', color: '#8338ec', size: 0.95, depth: 0.6 },
    { shape: 'zigzag', color: '#e9c46a', size: 0.8, depth: 1.2 },
    { shape: 'quarter', color: '#06d6a0', size: 0.7, depth: 0.5 },
    { shape: 'burst', color: '#fb5607', size: 0.55, depth: 1.05 },
  ],
  reviews: [
    { shape: 'zigzag', color: '#3a86ff', size: 1, depth: 1.1 },
    { shape: 'quarter', color: '#ffb703', size: 0.85, depth: 0.5 },
    { shape: 'squiggle', color: '#f472b6', size: 0.8, depth: 0.75 },
    { shape: 'burst', color: '#2a9d8f', size: 0.7, depth: 0.95 },
    { shape: 'zigzag', color: '#8338ec', size: 0.55, depth: 1.2 },
  ],
  contact: [
    { shape: 'squiggle', color: '#8338ec', size: 1, depth: 0.7 },
    { shape: 'burst', color: '#e63946', size: 1, depth: 0.95 },
    { shape: 'quarter', color: '#f472b6', size: 0.85, depth: 0.5 },
    { shape: 'zigzag', color: '#06d6a0', size: 0.8, depth: 1.15 },
    { shape: 'squiggle', color: '#ffb703', size: 0.55, depth: 0.65 },
  ],
};

function ShapeIcon({ kind, color }: { kind: ShapeKind; color: string }) {
  switch (kind) {
    case 'quarter':
      return (
        <span
          style={{
            display: 'block',
            width: 22,
            height: 22,
            borderRadius: '0 100% 0 0',
            backgroundColor: color,
          }}
        />
      );
    case 'burst':
      return (
        <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
          <g stroke={color} strokeWidth="2.4" strokeLinecap="round">
            <path d="M13 2 L13 24" />
            <path d="M2 13 L24 13" />
            <path d="M4.8 4.8 L21.2 21.2" />
            <path d="M21.2 4.8 L4.8 21.2" />
          </g>
        </svg>
      );
    case 'zigzag':
      return (
        <svg width="17" height="20" viewBox="0 0 22 26" fill="none">
          <path d="M13 1 L3 14 H11 L8 25 L20 10 H12 L13 1Z" fill={color} />
        </svg>
      );
    case 'squiggle':
      return (
        <svg width="26" height="17" viewBox="0 0 34 22" fill="none">
          <path
            d="M2 11c2-8 6-8 8 0s6 8 8 0 6-8 8 0 6 8 8 0"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    default:
      return null;
  }
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

interface InlineDecorShapeProps {
  shape: ShapeKind;
  color: string;
  size: number;
  depth: number;
}

function InlineDecorShape({ shape, color, size, depth }: InlineDecorShapeProps) {
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0 });

    const reveal = gsap.to(el, {
      opacity: 1,
      scale: size,
      duration: 0.5,
      ease: 'back.out(1.8)',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true,
      },
    });

    const idle = gsap.to(el, {
      rotation: 12,
      duration: 2.2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const setX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const setY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const maxTravel = 14 * depth;
    const radius = 180;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const pull = clamp(1 - distance / radius, 0, 1);

      setX((dx / radius) * maxTravel * pull);
      setY((dy / radius) * maxTravel * pull);
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      idle.kill();
      reveal.scrollTrigger?.kill();
      reveal.kill();
    };
  }, [shape, color, size, depth]);

  return (
    <span
      ref={elRef}
      data-decor-shape
      aria-hidden="true"
      className="mx-1 inline-flex items-center lg:mx-1.5"
      style={{ cursor: 'default' }}
    >
      <ShapeIcon kind={shape} color={color} />
    </span>
  );
}

export function getSectionDecorObjects(variant: Variant): ReactNode[] {
  return VARIANT_CONFIG[variant].map((config, index) => (
    <InlineDecorShape
      key={`${variant}-${config.shape}-${index}`}
      shape={config.shape}
      color={config.color}
      size={config.size}
      depth={config.depth}
    />
  ));
}
