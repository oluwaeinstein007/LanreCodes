'use client';

import { motion } from 'framer-motion';

type Props = {
  label: string;   // small monospace label above
  title: string;   // large heading
  subtitle?: string;
};

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xs mb-3 tracking-widest uppercase"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-4xl md:text-5xl font-bold relative inline-block"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
        {/* animated underline */}
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute -bottom-2 left-0 w-full"
          height="6"
          viewBox="0 0 200 6"
          fill="none"
        >
          <motion.path
            d="M0 3 Q50 0 100 3 Q150 6 200 3"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-5 text-lg max-w-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
