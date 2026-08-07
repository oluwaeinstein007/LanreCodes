'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

export default function AboutBio() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-3xl overflow-hidden grain">
          <Image
            src="/profile/profile.jpg"
            alt="Sanni Olanrewaju (Lanre)"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
          {/* Accent border overlay */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              border: '2px solid var(--accent)',
              opacity: 0.4,
            }}
          />
        </div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-4 -right-4 md:-right-8 rounded-2xl px-5 py-4 shadow-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Currently building</p>
          <p className="font-display font-bold text-sm" style={{ color: 'var(--accent)' }}>Anthyx</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Founder & CEO</p>
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="space-y-6">
        {[
          `I'm Sanni Olanrewaju — known as Lanre — a strategic Chief Technology Officer and AI Engineer
          with over 6 years of experience building scalable, production-grade products across fintech,
          travel, and emerging technology sectors.`,
          `My journey started with Engineering Physics at Obafemi Awolowo University — a foundation
          that taught me to think in systems, reason under uncertainty, and build with precision.
          That physicist's mindset translates directly into how I architect software: principled,
          measurable, and scalable.`,
          `Today, I'm building Anthyx — the AI-powered workspace where brands get operated — as
          Founder & CEO, while continuing to lead engineering at Travel Avatar (California) as CTO.
          I push the frontier of AI systems, from multi-agent pipelines and RAG architectures to MCP
          packages published on npm. I believe technology should move people, not just process data.`,
        ].map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-base leading-loose"
            style={{ color: 'var(--text-secondary)' }}
          >
            {para}
          </motion.p>
        ))}

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
        >
          {[
            { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria' },
            { icon: Briefcase, label: 'Focus', value: 'AI · FinTech · Scale' },
            { icon: GraduationCap, label: 'Education', value: 'BSc Engineering Physics, OAU' },
            { icon: Briefcase, label: 'Email', value: 'slanre26@gmail.com' },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <Icon size={16} className="accent-text mt-0.5 shrink-0" />
              <div>
                <p className="font-mono text-xs" style={{ color: 'var(--text-tertiary)' }}>{label}</p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
