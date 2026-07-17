'use client';

import { Volume2, VolumeX } from 'lucide-react';

import { useSound } from '@/lib/sound-context';
import { cn } from '@/lib/utils';

type SoundToggleProps = {
  className?: string;
};

export function SoundToggle({ className }: SoundToggleProps) {
  const { enabled, toggleEnabled, playImmediate } = useSound();

  const handleClick = () => {
    if (!enabled) playImmediate('toggleOn');
    toggleEnabled();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={enabled ? 'Mute interactive sound' : 'Unmute interactive sound'}
      aria-pressed={enabled}
      className={cn(className)}
    >
      {enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  );
}
