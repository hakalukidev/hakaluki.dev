'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type SoundKind = 'hover' | 'click' | 'toggleOn' | 'toggleOff' | 'open' | 'close';

type SoundContextValue = {
  enabled: boolean;
  toggleEnabled: () => void;
  play: (kind: SoundKind) => void;
  /** Plays regardless of the enabled flag — used for the mute toggle's own unmute confirmation. */
  playImmediate: (kind: SoundKind) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = 'hakaluki-sound-enabled';

type ToneStep = {
  freq: number;
  start: number;
  duration: number;
  peak: number;
  type?: OscillatorType;
};

const TONES: Record<SoundKind, ToneStep[]> = {
  hover: [{ freq: 1200, start: 0, duration: 0.05, peak: 0.035 }],
  click: [
    { freq: 700, start: 0, duration: 0.06, peak: 0.06 },
    { freq: 1000, start: 0.03, duration: 0.05, peak: 0.04 },
  ],
  toggleOn: [
    { freq: 520, start: 0, duration: 0.05, peak: 0.05 },
    { freq: 940, start: 0.05, duration: 0.09, peak: 0.05 },
  ],
  toggleOff: [
    { freq: 940, start: 0, duration: 0.05, peak: 0.05 },
    { freq: 520, start: 0.05, duration: 0.09, peak: 0.05 },
  ],
  open: [
    { freq: 420, start: 0, duration: 0.05, peak: 0.05 },
    { freq: 740, start: 0.04, duration: 0.08, peak: 0.05 },
  ],
  close: [
    { freq: 740, start: 0, duration: 0.05, peak: 0.05 },
    { freq: 420, start: 0.04, duration: 0.08, peak: 0.05 },
  ],
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setEnabled(stored === 'true');
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const getContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AudioContextCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return null;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextCtor();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }
    return ctx;
  }, []);

  const playImmediate = useCallback(
    (kind: SoundKind) => {
      const ctx = getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      for (const step of TONES[kind]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = step.type ?? 'sine';
        osc.frequency.setValueAtTime(step.freq, now + step.start);
        gain.gain.setValueAtTime(0, now + step.start);
        gain.gain.linearRampToValueAtTime(step.peak, now + step.start + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + step.start + step.duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + step.start);
        osc.stop(now + step.start + step.duration + 0.02);
      }
    },
    [getContext]
  );

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled) return;
      playImmediate(kind);
    },
    [enabled, playImmediate]
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ enabled, toggleEnabled, play, playImmediate }),
    [enabled, toggleEnabled, play, playImmediate]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

const noopSoundContext: SoundContextValue = {
  enabled: false,
  toggleEnabled: () => {},
  play: () => {},
  playImmediate: () => {},
};

export function useSound() {
  return useContext(SoundContext) ?? noopSoundContext;
}
