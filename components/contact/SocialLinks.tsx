'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SOCIALS = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@oluwaeinstein007',
    href: 'https://github.com/oluwaeinstein007',
    color: '#6e5494',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'sanni-lanre',
    href: 'https://linkedin.com/in/sanni-lanre-686125ba',
    color: '#0077B5',
  },
  {
    icon: Twitter,
    label: 'X / Twitter',
    handle: '@lanrecodes',
    href: 'https://x.com/lanrecodes',
    color: '#1d9bf0',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'slanre26@gmail.com',
    href: 'mailto:slanre26@gmail.com',
    color: '#EA4335',
  },
];

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {SOCIALS.map(({ icon: Icon, label, handle, href, color }, i) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}30` }}
          className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
          aria-label={`${label}: ${handle}`}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: color + '15', color }}
          >
            <Icon size={22} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</p>
            <p className="font-mono text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{handle}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
