'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: 'Website Development',
      description: 'Modern, fast, and fully responsive websites',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500',
      accent: '#3B82F6',
    },
    {
      title: 'App Development',
      description: 'Cross-platform mobile applications',
      icon: '📱',
      color: 'from-green-500 to-emerald-500',
      accent: '#10B981',
    },
    {
      title: 'Machine Learning',
      description: 'AI models and data science solutions',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500',
      accent: '#A855F7',
    },
    {
      title: 'Research Writing',
      description: 'Academic and technical research documentation',
      icon: '📝',
      color: 'from-yellow-500 to-orange-500',
      accent: '#F59E0B',
    },
    {
      title: 'Chatbot Solutions',
      description: 'AI-powered conversational agents',
      icon: '🤖',
      color: 'from-red-500 to-rose-500',
      accent: '#EF4444',
    },
    {
      title: 'Custom Software',
      description: 'Business solutions and enterprise applications',
      icon: '💼',
      color: 'from-indigo-500 to-blue-500',
      accent: '#6366F1',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .page-root {
          font-family: 'DM Sans', sans-serif;
        }

        .brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .grid-line {
          position: absolute;
          background: rgba(255,255,255,0.04);
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        .service-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2rem;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 16px;
        }

        .service-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.6);
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
          background: #fff;
          color: #0a0a0f;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 0 0 rgba(255,255,255,0);
        }

        .cta-btn:hover {
          box-shadow: 0 8px 40px rgba(255,255,255,0.15);
        }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          background: rgba(255,255,255,0.06);
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
          color: rgba(255,255,255,0.92);
          margin-bottom: 8px;
        }

        .service-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        .divider-line {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.5), transparent);
          margin: 0 auto 20px;
        }

        .section-label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }
      `}</style>

      <main
        className="page-root min-h-screen relative overflow-hidden"
        style={{ background: '#08080f' }}
      >
        {/* Noise texture */}
        <div className="noise-overlay" />

        {/* Radial ambient light */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(120,60,220,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Mouse glow */}
        <div
          style={{
            position: 'fixed',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            transform: `translate(${mousePosition.x - 240}px, ${mousePosition.y - 240}px)`,
            transition: 'transform 0.12s ease-out',
          }}
        />

        {/* Subtle grid lines */}
        {[0, 25, 50, 75, 100].map((pos) => (
          <div
            key={pos}
            className="grid-line"
            style={{ left: `${pos}%`, top: 0, bottom: 0, width: '1px' }}
          />
        ))}

        <div className="container mx-auto px-6 py-24 relative" style={{ zIndex: 10 }}>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-24"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <span className="tag-pill">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Coming Soon
              </span>
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="brand-name mb-6"
              style={{
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                color: '#fff',
                lineHeight: 1.0,
              }}
            >
              Hakaluki
              <span style={{ color: 'rgba(139,92,246,0.9)' }}>.</span>
              <br />
              Devs
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="divider-line"
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '460px',
                margin: '0 auto 24px',
                lineHeight: 1.7,
              }}
            >
              Where the freshness of Hakaluki Haor meets modern technology
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {['Website', 'App', 'AI', 'Research', 'Chatbot'].map((tag, i) => (
                <span key={i} className="tag-pill">{tag}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Services label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="text-center mb-10"
          >
            <p className="section-label">Our Services</p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.025, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                className="service-card"
              >
                {/* Accent corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: `radial-gradient(circle at top right, ${service.accent}18, transparent 70%)`,
                    borderRadius: '0 16px 0 0',
                    pointerEvents: 'none',
                  }}
                />

                <div className="icon-wrap">{service.icon}</div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                {/* Bottom indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 24,
                    right: 24,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 180 }}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert('We\'re launching soon! 🚀\nShare your idea with us: hello@hakaluki.devs')}
              className="cta-btn"
            >
              Start Your Project
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '28px',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '12px',
                fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              © 2025 Hakaluki.Devs &nbsp;·&nbsp; Energy, Creativity, Excellence
            </motion.p>
          </motion.div>

        </div>
      </main>
    </>
  );
}
