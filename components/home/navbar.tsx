'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import styles from './navbar.module.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

type HomeNavbarProps = {
  isScrolled: boolean;
};

export function HomeNavbar({ isScrolled }: HomeNavbarProps) {
  return (
    <header className={styles.siteHeader}>
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(styles.navShell, isScrolled && styles.scrolled)}
      >
        <a href="#home" className={styles.brandLockup} aria-label="Go to home section">
          <span className={styles.brandMark} aria-hidden="true">
            <span className={styles.brandMarkCore} />
          </span>
          <span className={styles.brandCopy}>
            Hakaluki<span className={styles.brandCopyMuted}>.Devs</span>
          </span>
        </a>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@hakaluki.devs?subject=Schedule%20a%20Meeting"
          className={styles.navCta}
        >
          Schedule a Meeting
        </a>
      </motion.div>
    </header>
  );
}
