import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

type ServiceMarkProps = {
  word: string;
  className?: string;
};

const palette = ['#1FAF9E', '#FF7E62', '#F0B429', '#9B6BD1', '#8CB369'];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function ServiceMark({ word, className }: ServiceMarkProps) {
  const letters = word.split('');

  return (
    <span role="img" aria-label={word} className={cn('service-mark', className)}>
      {letters.map((char, i) => {
        const seed = word.length * 17 + char.charCodeAt(0) * 31 + i * 97;
        const rot = (seededRandom(seed) - 0.5) * 26;
        const ty = (seededRandom(seed + 1) - 0.5) * 14;
        const scale = 0.92 + seededRandom(seed + 2) * 0.26;
        const fg = palette[Math.floor(seededRandom(seed + 3) * palette.length)];
        const echo = palette[Math.floor(seededRandom(seed + 4) * palette.length)];
        const spacing = i === 0 ? 0 : 0.05 + seededRandom(seed + 5) * 0.06;

        return (
          <span
            key={i}
            aria-hidden="true"
            data-ch={char === ' ' ? ' ' : char}
            className="service-mark-letter"
            style={
              {
                '--rot': `${rot.toFixed(2)}deg`,
                '--ty': `${ty.toFixed(2)}px`,
                '--scale': scale.toFixed(2),
                '--fg': fg,
                '--echo': echo,
                marginLeft: i === 0 ? 0 : `${spacing.toFixed(3)}em`,
              } as CSSProperties
            }
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
