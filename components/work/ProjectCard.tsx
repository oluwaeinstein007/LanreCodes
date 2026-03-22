'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Tag from '@/components/ui/Tag';
import type { Project } from '@/lib/data/projects';

const GRADIENT_FALLBACKS: Record<string, string> = {
  ai: 'linear-gradient(135deg, #1a1a3e 0%, #0f2027 50%, #203a43 100%)',
  web: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'open-source': 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
  api: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
  mobile: 'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',
};

type Props = { project: Project; featured?: boolean };

export default function ProjectCard({ project, featured = false }: Props) {
  const gradient = GRADIENT_FALLBACKS[project.category] || GRADIENT_FALLBACKS['web'];

  // 3D tilt via mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        willChange: 'transform',
      }}
      whileHover={{ boxShadow: '0 24px 60px var(--accent-glow)' }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
    >
      {/* Cover image / gradient */}
      <div className={`relative overflow-hidden ${featured ? 'h-72 md:h-96' : 'h-52'}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full" style={{ background: gradient }} />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

        {featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-medium"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Featured
          </div>
        )}

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-medium backdrop-blur-sm"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <ExternalLink size={14} />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-medium backdrop-blur-sm"
                style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span
                className="px-4 py-2 rounded-xl text-sm font-mono font-medium backdrop-blur-sm"
                style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
              >
                View Project →
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-mono text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
          {project.date}
        </p>
        <h3 className="font-display font-bold text-xl mb-1" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="font-medium text-sm mb-3" style={{ color: 'var(--accent)' }}>
          {project.subtitle}
        </p>
        <p
          className={`text-sm leading-relaxed mb-4 ${featured ? '' : 'line-clamp-3'}`}
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
