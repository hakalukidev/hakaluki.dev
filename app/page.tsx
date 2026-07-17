'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Headset,
  Mail,
  MapPin,
  RotateCcw,
  X,
  Zap,
} from 'lucide-react';
import './styles/home.css';

import { HomeNavbar } from '@/components/home/navbar';
import { ServiceMark } from '@/components/home/service-mark';
import { HeroTerminal } from '@/components/home/hero-terminal';
import { SocialDock } from '@/components/home/social-dock';
import { ContactForm } from '@/components/home/contact-form';
import { LiveStats } from '@/components/home/live-stats';
import { NoiseTexture } from '@/components/ui/noise-texture';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { OrbitIcon } from '@/components/ui/orbit-icon';
import { AvatarCircles } from '@/components/ui/avatar-circles';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { RippleButton } from '@/components/ui/ripple-button';
import { SoundProvider, useSound } from '@/lib/sound-context';
import { cn } from '@/lib/utils';
import { TextReveal } from '@/components/magicui/text-reveal';
import { DiaTextReveal } from '@/components/magicui/dia-text-reveal';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { AnimatedList } from '@/components/magicui/animated-list';
import { Highlighter } from '@/components/magicui/highlighter';
import { ScrollVelocity } from '@/components/magicui/scroll-based-velocity';
import { TweetCard } from '@/components/magicui/tweet-card';
import { MorphingText } from '@/components/magicui/morphing-text';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Safari } from '@/components/magicui/safari';
import { Ripple } from '@/components/magicui/ripple';
import { services } from './data/services';
import { innerTechnologies, middleTechnologies, outerTechnologies } from './data/technologies';
import { projects } from './data/projects';
import { founders } from './data/founders';
import { contactDetails } from './data/contactDetails';
import { reviews } from './data/reviews';

const reviewsMidpoint = Math.ceil(reviews.length / 2);
const reviewsRowOne = reviews.slice(0, reviewsMidpoint);
const reviewsRowTwo = reviews.slice(reviewsMidpoint);

const contactIcons: Record<string, typeof Mail> = {
  Email: Mail,
  Location: MapPin,
  Response: Clock,
};

const projectBentoMeta = [
  { className: 'lg:col-span-1 lg:row-span-2' },
  { className: 'lg:col-span-2 lg:row-span-1' },
  { className: 'lg:col-span-1 lg:row-span-1' },
  { className: 'lg:col-span-1 lg:row-span-1' },
];

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '');

const weBuildItems = [
  'CRM Systems',
  'ERP Systems',
  'Learning Management Systems',
  'E-commerce',
  'Custom Chatbots',
  'Accessibility Apps',
  'Landing Pages',
  'Conference Websites',
];

const weBuildColors = [
  '#e63946', // crimson red
  '#f4a261', // orange
  '#e9c46a', // gold
  '#2a9d8f', // teal
  '#457b9d', // blue
  '#8338ec', // violet
  '#ff6b9d', // pink
  '#06d6a0', // mint
];

const founderHighlightColors = [
  'rgba(220, 20, 60, 0.28)', // crimson
  'rgba(187, 247, 208, 0.45)', // pastel green
  'rgba(56, 189, 248, 0.35)', // sky blue
  'rgba(251, 146, 60, 0.35)', // orange
];

function HomeContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const foundersRef = useRef<HTMLDivElement | null>(null);
  const foundersInView = useInView(foundersRef, { once: true, amount: 0.3 });
  const [isTeamCtaStuck, setIsTeamCtaStuck] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsTeamCtaStuck(window.scrollY > window.innerHeight * 0.6);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('hakaluki-theme');
    const nextTheme = storedTheme === 'dark' ? 'dark' : 'light';

    const frameId = window.requestAnimationFrame(() => {
      setTheme(nextTheme);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleThemeChange = (nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
    window.localStorage.setItem('hakaluki-theme', nextTheme);
  };

  useEffect(() => {
    if (previewIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        play('close');
        setPreviewIndex(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewIndex, play]);

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

        <HomeNavbar theme={theme} onThemeChange={handleThemeChange} />

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="we-build-strip pt-24 px-6"
        >
          <p className="we-build-line">
            We build{' '}
            <MorphingText
              texts={weBuildItems}
              colors={weBuildColors}
              className="we-build-morph"
            />
            <span className="we-build-suffix"> — what do you need?</span>
          </p>
        </motion.section>

        <div className="container mx-auto px-6 pt-12 pb-24 relative" style={{ zIndex: 10 }}>
          <section id="home" className="hero-shell section-anchor mb-24">
            <div className="hero-top-row">
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="hero-index-tag"
              >
                [ Creative Studio ]
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="hero-stat"
              >
                <div className="hero-stat-value"><span className="hero-stat-arrow">↑</span>200x FASTER | AI AUGMENTED DEVELOPMENT</div>
                <p className="hero-stat-copy">
                  Transforming businesses with intelligent automation, custom software, and AI-driven solutions.
                </p>
              </motion.div>
            </div>

            <div className="hero-center">
              <div className="hero-copy-col">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-brand-tag"
                >
                  hakaluki<span className="hero-brand-tag-accent">.dev</span>
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="hero-headline"
                >
                  Engineering the Future of <AuroraText>Business</AuroraText>
                  <br />
                  <TypingAnimation
                    as="span"
                    className="hero-subheadline"
                    duration={22}
                    delay={900}
                  >
                    with Scalable Software, Intelligent Automation, and Cutting-Edge AI Solutions.
                  </TypingAnimation>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="hero-copy"
                >
                  A focused digital studio building websites, apps, and AI-powered experiences
                  with thoughtful execution and a calm visual edge.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-wrap gap-3"
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.7 }}
                    className={cn('cta-btn cta-btn-team', isTeamCtaStuck && 'cta-btn-team-stuck')}
                  >
                    <AvatarCircles
                      className="cta-btn-team-avatars"
                      avatarUrls={founders.map((founder) => ({
                        imageUrl: founder.image,
                        profileUrl: '#about',
                      }))}
                    />
                    <a
                      href="#contact"
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                      className="cta-btn-team-text flex justify-between items-center gap-2"
                    >
                      Talk to the Team
                      <span className="inline-flex size-4.5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <ArrowUpRight className="size-4.5" aria-hidden="true" />
      </span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hero-terminal-col"
              >
                <HeroTerminal />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="hero-perks"
                >
                  <span className="hero-perk">
                    <RotateCcw className="hero-perk-icon" size={15} strokeWidth={2.25} />
                    Free Revision — 1 Month
                  </span>
                  <span className="hero-perk">
                    <Headset className="hero-perk-icon" size={15} strokeWidth={2.25} />
                    24/7 365 Support
                  </span>
                  <span className="hero-perk">
                    <Zap className="hero-perk-icon" size={15} strokeWidth={2.25} />
                    Instant Reply to Customer
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section id="services" className="section-anchor">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mx-auto mb-10 max-w-3xl"
            >
              <h2 className="section-label">
                <DiaTextReveal
                  text="Our Services"
                  textColor="var(--text-strong)"
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
                />
              </h2>
              <TextReveal>
                Design, engineering, and AI systems built to launch fast and stay calm under scale.
              </TextReveal>
            </motion.div>

            <div className="services-layout">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="services-orbit-col"
              >
                <p className="services-orbit-label">Our Stack</p>

                <div className="orbit-stage">
                  <OrbitingCircles radius={64} duration={16} iconSize={34}>
                    {innerTechnologies.map(({ name, icon: Icon, color }) => (
                      <OrbitIcon key={name} className="orbit-icon" title={name}>
                        <Icon size={18} style={{ color }} />
                      </OrbitIcon>
                    ))}
                  </OrbitingCircles>

                  <OrbitingCircles radius={116} duration={26} iconSize={40} reverse>
                    {middleTechnologies.map(({ name, icon: Icon, color }) => (
                      <OrbitIcon key={name} className="orbit-icon" title={name}>
                        <Icon size={20} style={{ color }} />
                      </OrbitIcon>
                    ))}
                  </OrbitingCircles>

                  <OrbitingCircles radius={172} duration={38} iconSize={46}>
                    {outerTechnologies.map(({ name, icon: Icon, color }) => (
                      <OrbitIcon key={name} className="orbit-icon" title={name}>
                        <Icon size={22} style={{ color }} />
                      </OrbitIcon>
                    ))}
                  </OrbitingCircles>
                </div>
              </motion.div>

              <div className="services-list-col">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="service-row"
                    style={{ '--row-accent': service.accent } as CSSProperties}
                  >
                    <span className="service-mark-slot">
                      <ServiceMark word={service.mark} />
                    </span>

                    <span className="service-index">{String(index + 1).padStart(2, '0')}</span>

                    <div className="service-copy">
                      <h3 className="service-name">
                        {service.title}
                        <span className="service-name-mark" style={{ background: service.accent }} />
                      </h3>
                      <p className="service-desc">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <motion.section
            id="projects"
            className="section-anchor mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-10 max-w-3xl">
              <h2 className="section-label">
                <DiaTextReveal
                  text="Projects"
                  textColor="var(--text-strong)"
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
                />
              </h2>
              <TextReveal>
                Recent builds with production-ready polish.
              </TextReveal>
            </div>

            <BentoGrid className="grid-cols-1 lg:grid-cols-3 auto-rows-[20rem] lg:auto-rows-[16rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                {(projectsExpanded ? projects : projects.slice(0, 4)).map((project, index) => {
                  const meta = projectBentoMeta[index % projectBentoMeta.length];

                  return (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={cn('col-span-1 row-span-1', meta.className)}
                    >
                      <BentoCard
                        name={project.title}
                        link={project.link}
                        className="h-full"
                        background={
                          <div
                            className="absolute inset-0 flex cursor-zoom-in items-start justify-center overflow-hidden"
                            role="button"
                            tabIndex={0}
                            aria-label={`Preview ${project.title} screenshot`}
                            onMouseEnter={() => play('hover')}
                            onClick={() => {
                              play('open');
                              setPreviewIndex(index);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                play('open');
                                setPreviewIndex(index);
                              }
                            }}
                          >
                            <Safari
                              url={`hakaluki.dev/${slugify(project.title)}`}
                              imageSrc={project.image}
                              imageAlt={`${project.title} — ${project.category} project screenshot by hakaluki.dev`}
                              mode="simple"
                              className="shrink-0 transition-transform duration-500 group-hover:scale-[1.02]"
                              style={{ width: '100%', height: 'auto' }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/95 via-black/25 to-transparent" />
                          </div>
                        }
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </BentoGrid>

            {projects.length > 4 && (
              <div className="mt-10 flex justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => play('hover')}
                  onClick={() => {
                    play('click');
                    setProjectsExpanded((prev) => !prev);
                  }}
                  className="cta-btn cta-btn-outline"
                >
                  {projectsExpanded ? 'Show less' : 'See more'}
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform duration-300',
                      projectsExpanded && 'rotate-180'
                    )}
                  />
                </motion.button>
              </div>
            )}
          </motion.section>

          <motion.section
            id="about"
            className="section-anchor mt-28 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-10 max-w-3xl">
              <h2 className="section-label">
                <DiaTextReveal
                  text="About Us"
                  textColor="var(--text-strong)"
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
                />
              </h2>
              <TextReveal>
                Small team energy, senior-level execution.
              </TextReveal>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  marginTop: '16px',
                }}
              >
                All founders are graduates of renowned universities in Bangladesh, majoring in
                Software Engineering, and each brings hands-on industrial professional
                experience. Backed by{' '}
                <Highlighter action="box" color="rgba(220, 20, 60, 0.6)" strokeWidth={2} padding={4} isView>
                  20+ engineers
                </Highlighter>{' '}
                and a total team of 25+, we stay small by design — but highly specialized in what
                we build.
              </p>

            </div>

            <h3 className="founders-heading">Founders</h3>

            <div ref={foundersRef} className="founder-list">
              {foundersInView && (
                <AnimatedList
                  delay={220}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
                >
                  {founders.map((founder, index) => (
                    <div key={founder.name} className="founder-row">
                      <span className="founder-index">{String(index + 1).padStart(2, '0')}</span>

                      <span className="founder-avatar">
                        <Image
                          src={founder.image}
                          width={168}
                          height={168}
                          sizes="168px"
                          alt={`${founder.name} — ${founder.roleFull}, hakaluki.dev`}
                          className="founder-photo"
                        />
                      </span>

                      <div className="founder-copy">
                        <h4 className="founder-title">{founder.name}</h4>
                        <span className="founder-highlight">
                          <Highlighter action="highlight" color={founderHighlightColors[index]} padding={6} isView>
                            {founder.tagline}
                          </Highlighter>
                        </span>
                        <p className="founder-role">{founder.roleFull}</p>
                        {founder.background && (
                          <p className="founder-background">{founder.background}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </AnimatedList>
              )}
            </div>
          </motion.section>

          <motion.section
            id="network"
            className="section-anchor mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-14 max-w-3xl">
              <h2 className="section-label">
                <DiaTextReveal
                  text="By The Numbers"
                  textColor="var(--text-strong)"
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
                />
              </h2>
              <TextReveal>
                Live signals from a studio built to move fast, stay reachable, and deliver consistently.
              </TextReveal>
            </div>

            <LiveStats theme={theme} />
          </motion.section>

          <motion.section
            id="reviews"
            className="section-anchor mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto mb-10 max-w-3xl">
              <h2 className="section-label">
                <DiaTextReveal
                  text="Client Reviews"
                  textColor="var(--text-strong)"
                  className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
                />
              </h2>
              <TextReveal>
                Real feedback from teams we have shipped with — contact us to see more projects.
              </TextReveal>
            </div>

            <div className="review-marquee-wrap">
              <ScrollVelocity default_velocity={2}>
                {reviewsRowOne.map((review) => (
                  <TweetCard
                    key={review.name}
                    name={review.name}
                    handle={review.handle}
                    href={review.href}
                    text={review.text}
                    date={review.date}
                  />
                ))}
              </ScrollVelocity>
              <ScrollVelocity default_velocity={-2}>
                {reviewsRowTwo.map((review) => (
                  <TweetCard
                    key={review.name}
                    name={review.name}
                    handle={review.handle}
                    href={review.href}
                    text={review.text}
                    date={review.date}
                  />
                ))}
              </ScrollVelocity>
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="section-anchor contact-section mt-28"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Ripple className="contact-ripple" numCircles={6} mainCircleSize={180} mainCircleOpacity={0.18} />

            <h2 className="section-label mx-auto mb-10 max-w-3xl">
              <DiaTextReveal
                text="Contact"
                textColor="var(--text-strong)"
                className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
              />
            </h2>

            <div className="contact-intro">
              <TextReveal>
                Ready to plan your next build?
              </TextReveal>

              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                }}
              >
                Share the idea, product, or business goal you are working toward. We can map
                the scope, recommend a direction, and start the conversation with a simple
                meeting.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-card contact-card-info">
                <RippleButton
                  href="https://calendar.app.google/Ar4ow1C8LtAtEFac9"
                  target="_blank"
                  rel="noopener noreferrer"
                  rippleColor="rgba(255,255,255,0.7)"
                  className="cta-ripple mt-8 self-start"
                >
                  Schedule a Meeting
                  <span style={{ fontSize: 18, lineHeight: 1 }}>↗</span>
                </RippleButton>

                <div className="contact-list">
                  {contactDetails.map((detail) => {
                    const Icon = contactIcons[detail.label] ?? Mail;
                    return (
                      <div key={detail.label} className="contact-item">
                        <span className="contact-item-icon">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span className="contact-item-copy">
                          <span className="contact-label">{detail.label}</span>
                          {detail.href ? (
                            <a href={detail.href} className="contact-value-link">
                              {detail.value}
                            </a>
                          ) : (
                            <span className="contact-value">{detail.value}</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="contact-card contact-card-form">
                <ContactForm />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: '48px',
                color: 'var(--text-faint)',
                fontSize: '12px',
                fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              © 2026 hakaluki.dev · Automate. Innovate. Accelerate.
            </motion.p>
          </motion.section>
        </div>
      </main>

      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            key="project-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            onClick={() => {
              play('close');
              setPreviewIndex(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                onMouseEnter={() => play('hover')}
                onClick={() => {
                  play('close');
                  setPreviewIndex(null);
                }}
                className="absolute -top-12 right-0 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="size-5" />
              </button>

              <div className="relative flex max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
                <Image
                  src={projects[previewIndex].image}
                  width={projects[previewIndex].imageWidth}
                  height={projects[previewIndex].imageHeight}
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  alt={`${projects[previewIndex].title} full project screenshot`}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">{projects[previewIndex].title}</h3>
                <p className="text-sm text-white/60">{projects[previewIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SocialDock />
    </>
  );
}

export default function Home() {
  return (
    <SoundProvider>
      <HomeContent />
    </SoundProvider>
  );
}
