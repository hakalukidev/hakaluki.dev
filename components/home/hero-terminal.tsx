'use client';

import { useRef } from 'react';

import { BorderBeam } from '@/components/magicui/border-beam';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/magicui/terminal';

export function HeroTerminal() {
  const shellRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    const tilt = tiltRef.current;
    if (!shell || !tilt) return;

    const rect = shell.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    shell.classList.add('is-tilting');
    tilt.style.transform = `rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 16).toFixed(2)}deg) translateZ(20px) scale(1.015)`;
  };

  const handleMouseLeave = () => {
    const shell = shellRef.current;
    const tilt = tiltRef.current;
    if (!shell || !tilt) return;

    shell.classList.remove('is-tilting');
    tilt.style.transform = '';
  };

  return (
    <div
      ref={shellRef}
      className="hero-terminal-shell rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={tiltRef} className="hero-terminal-tilt rounded-xl">
        <Terminal
          className="hero-terminal max-w-none"
          style={{ fontFamily: 'var(--font-doto), monospace' }}
        >
          <TypingAnimation>&gt; hakaluki --run-pipeline</TypingAnimation>

          <AnimatedSpan delay={1000} className="hero-terminal-ok">
            [✓] Business Discovery
          </AnimatedSpan>

          <AnimatedSpan delay={1350} className="hero-terminal-ok">
            [✓] Workflow Analysis
          </AnimatedSpan>

          <AnimatedSpan delay={1700} className="hero-terminal-ok">
            [✓] AI Automation Planning
          </AnimatedSpan>

          <AnimatedSpan delay={2050} className="hero-terminal-ok">
            [✓] Custom Software Development
          </AnimatedSpan>

          <AnimatedSpan delay={2400} className="hero-terminal-ok">
            [✓] Testing &amp; Deployment
          </AnimatedSpan>

          <AnimatedSpan delay={2750} className="hero-terminal-running">
            [⟳] Continuous Support &amp; Optimization
          </AnimatedSpan>

          <AnimatedSpan delay={3100} className="hero-terminal-muted">
            ────────────────────────────────────────────
          </AnimatedSpan>

          <AnimatedSpan delay={3450} className="hero-terminal-info">
            [INFO] Pipeline completed successfully.
          </AnimatedSpan>

          <AnimatedSpan delay={3750} className="hero-terminal-ok">
            [SUCCESS] Deployment complete.
          </AnimatedSpan>
        </Terminal>

        <BorderBeam size={100} duration={6} colorFrom="#f97316" colorTo="#dc2626" />
      </div>
    </div>
  );
}
