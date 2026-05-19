'use client';

import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

type HomeNavbarProps = {
  isScrolled: boolean;
};

const introEase = [0.16, 1, 0.3, 1] as const;
const shellEase = [0.22, 1, 0.36, 1] as const;
const scrolledBorderRadius = 12;
const mobileBreakpoint = 720;
const talkToTeamHref = 'mailto:hello@hakaluki.devs?subject=Talk%20to%20the%20Team';

function HomeNavbarComponent({ isScrolled }: HomeNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= mobileBreakpoint;
      setIsMobileViewport(isMobile);

      if (!isMobile) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const shouldApplyScrollEffect = isScrolled && !isMobileViewport;
  const talkToTeamLabel = (
    <>
      <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/65 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-2">
        <span className="max-[420px]:hidden">Talk to the Team</span>
        <span className="hidden max-[420px]:inline">Talk</span>
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#0a0a0f]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </span>
    </>
  );

  return (
    <header className="fixed top-0 left-0 flex justify-center w-full z-40 pointer-events-none">
      <motion.div
        layout
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: 1,
          y: 0,
          marginTop: shouldApplyScrollEffect ? 12 : 0,
          paddingTop: shouldApplyScrollEffect ? 12 : 18,
          paddingRight: shouldApplyScrollEffect ? 16 : 24,
          paddingBottom: shouldApplyScrollEffect ? 12 : 16,
          paddingLeft: shouldApplyScrollEffect ? 16 : 24,
          borderRadius: shouldApplyScrollEffect ? scrolledBorderRadius : 0,
          borderColor: shouldApplyScrollEffect ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0)',
          boxShadow: shouldApplyScrollEffect ? '0 18px 60px rgba(0,0,0,0.36)' : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{
          default: { duration: 0.5, ease: shellEase },
          layout: { duration: 0.5, ease: shellEase },
          opacity: { duration: 0.6, ease: introEase },
          y: { duration: 0.6, ease: introEase },
        }}
        className={cn(
          'pointer-events-auto relative flex w-full flex-col gap-3 overflow-hidden border border-transparent backdrop-blur-xl will-change-transform',
          shouldApplyScrollEffect && 'w-[min(calc(100vw-24px),960px)]'
        )}
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-[rgba(8,8,15,0.72)] to-[rgba(8,8,15,0.28)]"
          animate={{ opacity: shouldApplyScrollEffect ? 0.2 : 1 }}
          transition={{ duration: 0.45, ease: shellEase }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(10,10,18,0.84)]"
          animate={{ opacity: shouldApplyScrollEffect ? 1 : 0 }}
          transition={{ duration: 0.45, ease: shellEase }}
        />

        <div className="relative z-10 flex w-full min-w-0 items-center gap-4 max-[720px]:gap-2">
          <a
            href="#home"
            className="inline-flex min-w-0 shrink-0 items-center gap-3 text-white no-underline max-[720px]:flex-1 max-[720px]:shrink max-[720px]:gap-2"
            aria-label="Go to home section"
          >
            <span
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-green-400 shadow-[0_12px_30px_rgba(139,92,246,0.3)]"
              aria-hidden="true"
            >
              <span className="relative h-5.5 w-5.5 rounded-full bg-[#08080f]">
                <span className="absolute -top-0.75 -right-1.75 h-3.75 w-3.75 rounded-full bg-white/95" />
              </span>
            </span>

            <span className="truncate font-syne text-[1.6rem] font-bold leading-none tracking-[-0.04em] max-[840px]:text-[1.35rem] max-[520px]:text-[1.18rem] max-[380px]:text-[1.02rem]">
              Hakaluki<span className="text-white/60">.Devs</span>
            </span>
          </a>

          <div className="ml-auto hidden min-w-0 shrink-0 items-center gap-2 max-[720px]:flex">
            <Button
              asChild
              variant="default"
              className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/35 bg-linear-to-br from-white via-[#f6f3ff] to-[#ddd6fe] px-4 py-2.5 font-syne text-[12px] font-bold text-[#0a0a0f] no-underline shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,255,255,0.2)] focus-visible:ring-white/35 max-[420px]:px-3 max-[420px]:gap-1"
            >
              <a href={talkToTeamHref}>
                {talkToTeamLabel}
              </a>
            </Button>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="home-mobile-navigation"
              onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/6 text-white transition-colors hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              {isMobileMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>

          <motion.div
            layout="position"
            className="ml-auto flex min-w-0 items-center justify-end gap-3 max-[960px]:gap-2 max-[720px]:hidden"
          >
            <nav
              className="flex min-w-0 flex-wrap items-center justify-end gap-2.5 max-[840px]:gap-1.5"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-sm px-3.5 py-2.5 text-sm text-white/70 no-underline transition-colors hover:bg-white/[0.08] hover:text-white max-[840px]:px-2.5 max-[840px]:py-2 max-[840px]:text-[13px]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button
              asChild
              variant="default"
              className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/35 bg-linear-to-br from-white via-[#f6f3ff] to-[#ddd6fe] px-5 py-3 font-syne text-sm font-bold text-[#0a0a0f] no-underline shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,255,255,0.2)] focus-visible:ring-white/35 max-[840px]:px-4 max-[840px]:py-2.5 max-[840px]:text-[12px]"
            >
              <a href={talkToTeamHref}>
                {talkToTeamLabel}
              </a>
            </Button>
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen ? (
            <motion.div
              id="home-mobile-navigation"
              key="home-mobile-navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: shellEase }}
              className="relative z-10 hidden overflow-hidden max-[720px]:block"
            >
              <motion.nav
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: shellEase }}
                style={{ transformOrigin: 'left center' }}
                className="flex w-full origin-left flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-white/78 no-underline transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

export const HomeNavbar = memo(HomeNavbarComponent);
HomeNavbar.displayName = 'HomeNavbar';
