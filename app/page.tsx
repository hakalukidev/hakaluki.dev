'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './styles/home.css';

import { HomeNavbar } from '@/components/home/navbar';
import { DotBrandText } from '@/components/ui/dot-brand-text';
import { NoiseTexture } from '@/components/ui/noise-texture';
import { services } from './data/services';
import { projects } from './data/projects';
import { aboutPillars } from './data/aboutPillars';
import { contactDetails } from './data/contactDetails';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 56);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('hakaluki-theme');
    const nextTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    const frameId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleThemeChange = (nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
    window.localStorage.setItem('hakaluki-theme', nextTheme);
  };

  return (
    <>
      <main
        className={`page-root theme-${theme} min-h-screen relative overflow-hidden`}
      >
        <NoiseTexture
          aria-hidden="true"
          className="fixed inset-0 z-[1] opacity-[0.03]"
          frequency={0.85}
          octaves={4}
          slope={0.18}
          noiseOpacity={0.22}
        />

        <div className="ambient-field" aria-hidden="true" />

        <div
          className="cursor-glow"
          style={{
            transform: `translate(${mousePosition.x - 240}px, ${mousePosition.y - 240}px)`,
          }}
        />

        <HomeNavbar
          isScrolled={isScrolled}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        {[0, 25, 50, 75, 100].map((position) => (
          <div
            key={position}
            className="grid-line"
            style={{ left: `${position}%`, top: 0, bottom: 0, width: '1px' }}
          />
        ))}

        <div className="container mx-auto px-6 pt-40 pb-24 relative" style={{ zIndex: 10 }}>
          <section id="home" className="section-anchor">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-24"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-8"
              >
                <span className="tag-pill">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'inline-block',
                    }}
                  />
                  Creative Studio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7 flex justify-center"
              >
                <DotBrandText />
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="divider-line"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="hero-copy"
              >
                A focused digital studio building websites, apps, and AI-powered experiences
                with thoughtful execution and a calm visual edge.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="flex flex-wrap justify-center gap-2"
              >
                {['Website', 'App', 'AI', 'Research', 'Chatbot'].map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section id="services" className="section-anchor">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-center mb-10"
            >
              <p className="section-label">Our Services</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.85 + index * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.025,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                  className="service-card"
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 80,
                      height: 80,
                      background: `radial-gradient(circle at top right, ${service.accent}12, transparent 70%)`,
                      borderRadius: '0 16px 0 0',
                      pointerEvents: 'none',
                    }}
                  />

                  <div className="icon-wrap">{service.icon}</div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 24,
                      right: 24,
                      height: '1px',
                      background: `linear-gradient(90deg, transparent, ${service.accent}30, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <motion.section
            id="projects"
            className="section-anchor mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="section-label">Projects</p>
              <h2 className="brand-name project-heading">
                Recent builds with production-ready polish.
              </h2>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="magic-project-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 360, damping: 24 },
                  }}
                  style={{ '--project-accent': project.accent } as CSSProperties}
                >
                  <div className="magic-project-glow" aria-hidden="true" />
                  <div className="magic-project-media">
                    <Image
                      src={project.image}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={`${project.title} project screenshot`}
                      className="project-image"
                    />
                  </div>

                  <div className="magic-project-content">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="project-tags">
                      {project.stats.map((stat) => (
                        <span key={stat}>{stat}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="section-anchor mt-28 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label text-center">About Us</p>

            <div className="about-panel">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
                <div>
                  <h2
                    className="brand-name"
                    style={{
                      fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                      lineHeight: 1.05,
                      marginBottom: '18px',
                      color: 'var(--text-strong)',
                    }}
                  >
                    Small team energy, senior-level execution.
                  </h2>

                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: 'var(--text-muted)',
                      maxWidth: '690px',
                    }}
                  >
                    Hakaluki.Devs blends product thinking, sharp visuals, and practical
                    engineering. We help founders and teams ship digital experiences that feel
                    polished, fast, and confidently built.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <span className="tag-pill">Landing Pages</span>
                  <span className="tag-pill">Mobile Apps</span>
                  <span className="tag-pill">Automation</span>
                  <span className="tag-pill">AI Workflows</span>
                </div>
              </div>

              <div className="about-grid">
                {aboutPillars.map((pillar) => (
                  <div key={pillar.title} className="about-card">
                    <h3 className="about-card-title">{pillar.title}</h3>
                    <p className="about-card-text">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="section-anchor mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label text-center">Contact</p>

            <div className="contact-grid">
              <div className="contact-card">
                <h2
                  className="brand-name"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.3rem)',
                    lineHeight: 1.05,
                    marginBottom: '18px',
                    color: 'var(--text-strong)',
                  }}
                >
                  Ready to plan your next build?
                </h2>

                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--text-muted)',
                    maxWidth: '560px',
                  }}
                >
                  Share the idea, product, or business goal you are working toward. We can map
                  the scope, recommend a direction, and start the conversation with a simple
                  meeting.
                </p>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:hello@hakaluki.devs?subject=Schedule%20a%20Meeting"
                  className="cta-btn mt-8"
                >
                  Schedule a Meeting
                  <span style={{ fontSize: 18, lineHeight: 1 }}>↗</span>
                </motion.a>
              </div>

              <div className="contact-card">
                <div className="contact-list">
                  {contactDetails.map((detail) => (
                    <div key={detail.label} className="contact-item">
                      <span className="contact-label">{detail.label}</span>
                      {detail.href ? (
                        <a href={detail.href} className="contact-value-link">
                          {detail.value}
                        </a>
                      ) : (
                        <span className="contact-value">{detail.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: '28px',
                color: 'var(--text-faint)',
                fontSize: '12px',
                fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              © 2026 Hakaluki.Devs · Energy, Creativity, Excellence
            </motion.p>
          </motion.section>
        </div>
      </main>
    </>
  );
}
