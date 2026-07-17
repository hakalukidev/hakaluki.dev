'use client';

import { useRef, type ComponentType, type CSSProperties, type RefObject } from 'react';
import Image from 'next/image';
import {
  Code2,
  Eye,
  FolderKanban,
  Globe2,
  HardHat,
  Headset,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { useTotalVisitors } from '@/lib/use-total-visitors';

type StatNode = {
  key: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  angle: number;
  color: string;
};

const statNodes: StatNode[] = [
  { key: 'visitors', icon: Eye, label: 'Total Visitors', value: 0, angle: -90, color: '#e63946' },
  { key: 'clients', icon: Users, label: 'Happy Clients', value: 10, suffix: '+', angle: -45, color: '#f4a261' },
  { key: 'projects', icon: FolderKanban, label: 'Projects Shipped', value: 14, angle: 0, color: '#e9c46a' },
  { key: 'engineers', icon: HardHat, label: 'Engineers', value: 20, suffix: '+', angle: 45, color: '#2a9d8f' },
  { key: 'response', icon: Headset, label: 'Response Time', value: 24, suffix: '/7', angle: 90, color: '#457b9d' },
  { key: 'satisfaction', icon: ShieldCheck, label: 'Client Satisfaction', value: 100, suffix: '%', angle: 135, color: '#8338ec' },
  { key: 'countries', icon: Globe2, label: 'Countries Served', value: 5, suffix: '+', angle: 180, color: '#ff6b9d' },
  { key: 'tech', icon: Code2, label: 'Technologies', value: 15, suffix: '+', angle: -135, color: '#06d6a0' },
];

const RADIUS = 41;

function nodePosition(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + RADIUS * Math.cos(rad)}%`,
    top: `${50 + RADIUS * Math.sin(rad)}%`,
  };
}

type LiveStatsProps = {
  theme: 'light' | 'dark';
};

export function LiveStats({ theme }: LiveStatsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, RefObject<HTMLDivElement | null>>>(
    Object.fromEntries(statNodes.map((node) => [node.key, { current: null }]))
  ).current;
  const totalVisitors = useTotalVisitors();

  return (
    <div ref={containerRef} className="stats-network">
      <div ref={centerRef} className="stats-node stats-node-center">
        <Image
          src={theme === 'dark' ? '/logo/hakaluki_logo_dark.png' : '/logo/hakaluki_logo.png'}
          alt="hakaluki.dev"
          width={692}
          height={183}
          className="stats-node-logo"
        />
      </div>

      {statNodes.map((node) => {
        const Icon = node.icon;
        const position = nodePosition(node.angle);
        const isVisitors = node.key === 'visitors';
        const displayValue = isVisitors ? totalVisitors ?? 0 : node.value;

        return (
          <div
            key={node.key}
            ref={(el) => {
              nodeRefs[node.key].current = el;
            }}
            className="stats-node"
            aria-label={`${node.label}: ${displayValue}${node.suffix ?? ''}`}
            style={{ left: position.left, top: position.top, '--node-color': node.color } as CSSProperties}
          >
            <Icon size={20} strokeWidth={2.25} className="stats-node-icon" />
            <span className="stats-node-value">
              {isVisitors && totalVisitors === null ? (
                <span className="stats-node-value-placeholder">&nbsp;</span>
              ) : (
                <>
                  <NumberTicker value={displayValue} />
                  {node.suffix}
                </>
              )}
            </span>
            <span className="stats-node-label">{node.label}</span>
          </div>
        );
      })}

      {statNodes.map((node, index) => (
        <AnimatedBeam
          key={node.key}
          containerRef={containerRef}
          fromRef={nodeRefs[node.key]}
          toRef={centerRef}
          curvature={0}
          duration={5 + (index % 3)}
          delay={index * 0.25}
          reverse={index % 2 === 0}
          gradientStartColor={node.color}
          gradientStopColor="crimson"
          pathColor="var(--line-medium)"
          pathOpacity={0.35}
        />
      ))}
    </div>
  );
}
