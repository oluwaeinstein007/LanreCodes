import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const SOCIAL = [
  { icon: Github, href: 'https://github.com/oluwaeinstein007', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sanni-lanre-686125ba', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com', label: 'X / Twitter' },
  { icon: Mail, href: 'mailto:slanre26@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-10 px-6 md:px-12"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Lanre<span className="accent-text">.</span>
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
            CTO · AI Engineer · Builder
          </p>
        </div>

        <div className="flex items-center gap-5">
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110"
              style={{ color: 'var(--text-secondary)', background: 'var(--surface-2)' }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
          © {new Date().getFullYear()} Sanni Olanrewaju. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
