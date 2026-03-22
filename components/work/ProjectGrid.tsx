'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FilterTabs, { type FilterValue } from './FilterTabs';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/data/projects';

export default function ProjectGrid() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) =>
    filter === 'all' ? !p.featured : p.category === filter
  );

  return (
    <div>
      <FilterTabs active={filter} onChange={setFilter} />

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {/* Featured — spans full width */}
        <AnimatePresence mode="wait">
          {filter === 'all' && featured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="col-span-full"
            >
              <ProjectCard project={featured} featured />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rest of cards — staggered entrance */}
        {rest.map((p, i) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={
              p.span === 'wide'
                ? 'md:col-span-2'
                : ''
            }
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
