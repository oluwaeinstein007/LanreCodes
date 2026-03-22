'use client';

import { motion } from 'framer-motion';
import type { SkillCategory as SkillCategoryType } from '@/lib/data/skills';

const LEVEL_COLORS = {
  Expert: 'var(--accent)',
  Proficient: '#10B981',
  Familiar: '#F59E0B',
};

const LEVEL_WIDTH = {
  Expert: '92%',
  Proficient: '72%',
  Familiar: '50%',
};

type Props = { category: SkillCategoryType; delay?: number };

export default function SkillCategory({ category, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <h3 className="font-display font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>
        {category.category}
      </h3>

      <div className="space-y-4">
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {skill.name}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  color: LEVEL_COLORS[skill.level],
                  background: LEVEL_COLORS[skill.level] + '20',
                }}
              >
                {skill.level}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: 'var(--surface-2)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: LEVEL_WIDTH[skill.level] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: LEVEL_COLORS[skill.level] }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
