'use client';

import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { SoundToggle } from '@/components/ui/sound-toggle';
import { useSound } from '@/lib/sound-context';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

type HomeNavbarProps = {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
};

const introEase = [0.16, 1, 0.3, 1] as const;
const shellEase = [0.22, 1, 0.36, 1] as const;

function HomeNavbarComponent({ theme, onThemeChange }: HomeNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 720) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const themeToggleLabel = `Switch to ${nextTheme} mode`;

  return (
    <header className="fixed top-0 left-0 flex justify-center w-full z-40 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: introEase }}
        className="pointer-events-auto relative flex w-full flex-col gap-3 overflow-hidden border border-transparent pt-4.5 pr-6 pb-4 pl-6 backdrop-blur-xl will-change-transform"
      >
        <span aria-hidden="true" className="home-nav-bg home-nav-bg-base absolute inset-0" />

        <div className="relative z-10 flex w-full min-w-0 items-center gap-4 max-[720px]:gap-2">
          <a
            href="#home"
            className="home-nav-brand inline-flex min-w-0 shrink-0 items-center no-underline"
            aria-label="Go to home section"
          >
            <Image
              src={theme === 'dark' ? '/logo/hakaluki_logo_dark.png' : '/logo/hakaluki_logo.png'}
              alt="hakaluki.dev"
              width={692}
              height={183}
              className="h-9 w-auto shrink-0 max-[520px]:h-7"
              priority
            />
          </a>

          <div className="ml-auto hidden min-w-0 shrink-0 items-center gap-2 max-[720px]:flex">
            <SoundToggle className="theme-icon-button [&_svg]:size-4.5" />

            <AnimatedThemeToggler
              theme={theme}
              onThemeChange={onThemeChange}
              aria-label={themeToggleLabel}
              className="theme-icon-button [&_svg]:size-4.5"
            />

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="home-mobile-navigation"
              onClick={() =>
                setIsMobileMenuOpen((currentValue) => {
                  play(currentValue ? 'close' : 'open');
                  return !currentValue;
                })
              }
              className="home-menu-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2"
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
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                  className="home-nav-link rounded-sm px-3.5 py-2.5 text-sm no-underline transition-colors max-[840px]:px-2.5 max-[840px]:py-2 max-[840px]:text-[13px]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <SoundToggle className="theme-mini-button [&_svg]:size-3.5" />

            <AnimatedThemeToggler
              theme={theme}
              onThemeChange={onThemeChange}
              aria-label={themeToggleLabel}
              className="theme-mini-button [&_svg]:size-3.5"
            />
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
                className="home-mobile-nav flex w-full origin-left flex-col gap-2 rounded-2xl border p-3 shadow-lg"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => play('hover')}
                    onClick={() => {
                      play('click');
                      setIsMobileMenuOpen(false);
                    }}
                    className="home-mobile-nav-link rounded-xl px-4 py-3 text-sm no-underline transition-colors"
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
