'use client';

import { motion } from 'framer-motion';

export type FilterValue = 'all' | 'ai' | 'web' | 'open-source' | 'api';

const TABS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Web Apps', value: 'web' },
  { label: 'Open Source', value: 'open-source' },
  { label: 'APIs', value: 'api' },
];

type Props = {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
};

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2 p-1.5 rounded-2xl mb-10"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      role="tablist"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            role="tab"
            aria-selected={isActive}
            className="relative px-5 py-2 rounded-xl text-sm font-mono font-medium transition-colors duration-200"
            style={{ color: isActive ? '#fff' : 'var(--text-tertiary)' }}
          >
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'var(--accent)' }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
