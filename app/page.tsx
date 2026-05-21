'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { HomeNavbar } from '@/components/home/navbar';
import { NoiseTexture } from '@/components/ui/noise-texture';

const services = [
  {
    title: 'Website Development',
    description: 'Modern, fast, and fully responsive websites',
    icon: '🌐',
    accent: '#3B82F6',
  },
  {
    title: 'App Development',
    description: 'Cross-platform mobile applications',
    icon: '📱',
    accent: '#10B981',
  },
  {
    title: 'Machine Learning',
    description: 'AI models and data science solutions',
    icon: '🧠',
    accent: '#A855F7',
  },
  {
    title: 'Research Writing',
    description: 'Academic and technical research documentation',
    icon: '📝',
    accent: '#F59E0B',
  },
  {
    title: 'Chatbot Solutions',
    description: 'AI-powered conversational agents',
    icon: '🤖',
    accent: '#EF4444',
  },
  {
    title: 'Custom Software',
    description: 'Business solutions and enterprise applications',
    icon: '💼',
    accent: '#6366F1',
  },
];

const aboutPillars = [
  {
    title: 'Intentional Design',
    description:
      'Interfaces with personality, clarity, and strong first impressions across desktop and mobile.',
  },
  {
    title: 'Reliable Engineering',
    description:
      'Clean builds, responsive layouts, and practical implementation choices that hold up after launch.',
  },
  {
    title: 'Applied AI',
    description:
      'Useful automation, chat experiences, and machine-learning features shaped around real business needs.',
  },
];

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@hakaluki.devs',
    href: 'mailto:hello@hakaluki.devs',
  },
  {
    label: 'Location',
    value: 'Sylhet, Bangladesh',
  },
  {
    label: 'Response',
    value: 'New project inquiries typically get a reply within 24 hours.',
  },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

        :root {
          scroll-behavior: smooth;
        }

        .page-root {
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .grid-line {
          position: absolute;
          background: rgba(0,0,0,0.04);
        }

        .service-card {
          position: relative;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 2rem;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .service-card:hover {
          border-color: rgba(0,0,0,0.15);
          background: rgba(0,0,0,0.04);
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.1);
          background: rgba(0,0,0,0.03);
          color: rgba(0,0,0,0.65);
          font-size: 13px;
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          background: #1a1a1a;
          color: #ffffff;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          border: none;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 0 0 rgba(0,0,0,0);
        }

        .cta-btn:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
        }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          background: rgba(0,0,0,0.04);
          margin-bottom: 20px;
          transition: transform 0.25s ease;
        }

        .service-card:hover .icon-wrap {
          transform: scale(1.1);
        }

        .service-title {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: rgba(0,0,0,0.85);
          margin-bottom: 8px;
        }

        .service-desc {
          font-size: 14px;
          color: rgba(0,0,0,0.55);
          line-height: 1.6;
        }

        .divider-line {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, rgba(0,0,0,0.4), transparent);
          margin: 0 auto 20px;
        }

        .section-label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
          margin-bottom: 16px;
        }

        .section-anchor {
          scroll-margin-top: 120px;
        }

        .about-panel,
        .contact-card {
          position: relative;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 28px;
          padding: 32px;
          overflow: hidden;
        }

        .about-panel::before,
        .contact-card::before {
          content: '';
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent);
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 32px;
        }

        .about-card {
          background: rgba(0,0,0,0.01);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 22px;
          padding: 22px;
        }

        .about-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          color: rgba(0,0,0,0.85);
          margin-bottom: 10px;
        }

        .about-card-text {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(0,0,0,0.55);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 18px;
          max-width: 1040px;
          margin: 0 auto;
        }

        .contact-list {
          display: grid;
          gap: 14px;
          margin-top: 2px;
        }

        .contact-item {
          padding: 16px 0 0;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .contact-item:first-child {
          padding-top: 0;
          border-top: none;
        }

        .contact-label {
          display: block;
          margin-bottom: 6px;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }

        .contact-value,
        .contact-value-link {
          color: rgba(0,0,0,0.7);
          font-size: 16px;
          line-height: 1.7;
        }

        .contact-value-link {
          text-decoration: none;
        }

        .contact-value-link:hover {
          color: #1a1a1a;
        }

        @media (max-width: 900px) {
          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .about-panel,
          .contact-card {
            padding: 24px;
          }
        }
      `}</style>

      <main
        className="page-root min-h-screen relative overflow-hidden"
        style={{ background: '#ffffff' }}
      >
        <NoiseTexture
          aria-hidden="true"
          className="fixed inset-0 z-[1] opacity-[0.03]"
          frequency={0.85}
          octaves={4}
          slope={0.18}
          noiseOpacity={0.22}
        />

        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'fixed',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            transform: `translate(${mousePosition.x - 240}px, ${mousePosition.y - 240}px)`,
            transition: 'transform 0.12s ease-out',
          }}
        />

        <HomeNavbar isScrolled={isScrolled} />

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
                className="brand-name mb-6"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  color: '#1a1a1a',
                  lineHeight: 1,
                }}
              >
                Hakaluki
                <span style={{ color: 'rgba(139,92,246,0.9)' }}>.</span>
                <br />
                Devs
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
                style={{
                  fontSize: '17px',
                  color: 'rgba(0,0,0,0.55)',
                  maxWidth: '560px',
                  margin: '0 auto 24px',
                  lineHeight: 1.7,
                }}
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
                      color: '#1a1a1a',
                    }}
                  >
                    Small team energy, senior-level execution.
                  </h2>

                  <p
                    style={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: 'rgba(0,0,0,0.55)',
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
                    color: '#1a1a1a',
                  }}
                >
                  Ready to plan your next build?
                </h2>

                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'rgba(0,0,0,0.55)',
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
                color: 'rgba(0,0,0,0.25)',
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