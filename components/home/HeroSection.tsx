'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useReduceMotionStore } from '@/lib/useReduceMotion';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const ROLES = ['Software Engineer', 'CTO', 'AI Builder', 'Tech Leader', 'Backend Architect'];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="accent-text">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const HEADLINE = 'I build things that scale.'.split(' ');

export default function HeroSection() {
  const { reduceMotion } = useReduceMotionStore();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="relative z-10">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-8"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span style={{ color: 'var(--text-secondary)' }}>Available for opportunities</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={reduceMotion ? {} : wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl md:text-2xl font-dm-sans mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Sanni Olanrewaju —{' '}
            <Typewriter />
          </motion.div>

          {/* Bio excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="text-base max-w-lg mb-10 leading-relaxed"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Strategic CTO and AI Engineer with 6+ years building scalable products across fintech,
            travel, and emerging technology. Now building Anthyx as Founder & CEO.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="primary" size="lg" onClick={() => scrollTo('work')}>
              View My Work →
            </Button>
            <a href="/cv/Sanni_Lanre_Resume.pdf" download>
              <Button variant="ghost" size="lg">
                <Download size={16} />
                Download CV
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex gap-8 mt-12"
          >
            {[
              { value: '6+', label: 'Years Exp.' },
              { value: '40K+', label: 'Users Scaled' },
              { value: '2', label: 'Companies Led' },
              { value: '4+', label: 'npm Packages' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold accent-text">{s.value}</p>
                <p className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block relative h-[520px] w-full"
        >
          {/* Glow blob behind canvas */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          />
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-current border-t-transparent rounded-full animate-spin accent-text" />
              </div>
            }
          >
            <HeroCanvas />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => scrollTo('about')}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
