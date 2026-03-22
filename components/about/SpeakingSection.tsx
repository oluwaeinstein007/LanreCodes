'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mic, Calendar, ExternalLink } from 'lucide-react';
import { speakingEvents } from '@/lib/data/speaking';

export default function SpeakingSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {speakingEvents.map((event, i) => (
        <motion.div
          key={event.event}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {/* Image */}
          <div className="relative h-44 w-full">
            <Image
              src={event.image || '/speaking/default.jpg'}
              alt={event.event}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {event.role}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="font-mono text-xs mb-1 accent-text">{event.organizer}</p>
            <h3 className="font-display font-bold text-base mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
              {event.event}
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {event.topic}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                <Calendar size={12} />
                {event.date}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                <Mic size={12} />
                {event.platform}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
