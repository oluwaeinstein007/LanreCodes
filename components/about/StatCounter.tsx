'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 40, suffix: 'K+', label: 'Users Scaled' },
  { value: 7, suffix: '+', label: 'Companies Served' },
  { value: 4, suffix: '+', label: 'npm Packages' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl p-5 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="font-display text-3xl font-bold mb-1 accent-text">
            <AnimatedNumber target={s.value} suffix={s.suffix} />
          </p>
          <p className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
