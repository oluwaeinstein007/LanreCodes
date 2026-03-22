'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/lib/data/timeline';
import Tag from '@/components/ui/Tag';
import { Briefcase } from 'lucide-react';

export default function Timeline() {
  return (
    <div className="relative mt-16">
      {/* Vertical line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
        style={{ background: 'var(--border)' }}
      />

      <div className="space-y-12">
        {timeline.map((entry, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={`${entry.company}-${i}`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col md:flex-row gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} pl-12 md:pl-0`}
            >
              {/* Dot */}
              <div
                className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  background: entry.current ? 'var(--accent)' : 'var(--surface)',
                  borderColor: entry.current ? 'var(--accent)' : 'var(--border)',
                  zIndex: 1,
                }}
              >
                {entry.current && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              {/* Card */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] rounded-2xl p-6 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                      {entry.role}
                    </h3>
                    <p className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                      {entry.company}
                    </p>
                  </div>
                  {entry.current && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-mono"
                      style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
                    >
                      Current
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  {entry.period} · {entry.location}
                </p>

                <ul className="space-y-2 mb-4">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="accent-text mt-0.5 shrink-0">▹</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {entry.stack.slice(0, 5).map((s) => (
                    <Tag key={s} label={s} />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
