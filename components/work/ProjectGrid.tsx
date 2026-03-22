'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FilterTabs, { type FilterValue } from './FilterTabs';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/data/projects';

export default function ProjectGrid() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const featured = projects.find((p) => p.featured);
  const filtered = projects.filter((p) =>
    filter === 'all' ? !p.featured : p.category === filter
  );

  return (
    <div>
      <FilterTabs active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured project (only in "all" view) */}
        <AnimatePresence mode="wait">
          {filter === 'all' && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="col-span-full"
            >
              <ProjectCard project={featured} featured />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular grid */}
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
