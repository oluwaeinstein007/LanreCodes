'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAccentColor, ACCENT_COLORS, applyAccentColor } from '@/lib/useAccentColor';
import { useReduceMotionStore } from '@/lib/useReduceMotion';

const FONT_SIZES = [
  { label: 'S', value: '14px' },
  { label: 'M', value: '16px' },
  { label: 'L', value: '18px' },
];

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccentColor();
  const { reduceMotion, toggleReduceMotion } = useReduceMotionStore();
  const [fontSize, setFontSize] = useState('16px');

  const applyFontSize = (size: string) => {
    setFontSize(size);
    document.documentElement.style.setProperty('--base-font-size', size);
    document.documentElement.style.fontSize = size;
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: 'var(--accent)', color: '#fff' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open settings"
      >
        <Settings size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.4)' }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed bottom-20 right-6 z-50 w-72 rounded-2xl p-5 shadow-2xl"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Preferences
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg"
                  style={{ color: 'var(--text-tertiary)' }}
                  aria-label="Close settings"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Theme toggle */}
              <div className="mb-5">
                <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  THEME
                </p>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: 'var(--surface-2)', color: 'var(--text-primary)' }}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                  </motion.div>
                  <span className="text-sm font-medium">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <div
                    className="ml-auto w-10 h-5 rounded-full relative transition-all duration-300"
                    style={{ background: theme === 'dark' ? 'var(--accent)' : 'var(--border-hover)' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300"
                      style={{ left: theme === 'dark' ? '22px' : '2px' }}
                    />
                  </div>
                </button>
              </div>

              {/* Accent color */}
              <div className="mb-5">
                <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  ACCENT COLOR
                </p>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setAccent(color);
                        applyAccentColor(color.value);
                      }}
                      title={color.label}
                      aria-label={`Set accent to ${color.label}`}
                      className="w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110"
                      style={{
                        background: color.value,
                        boxShadow: accent.name === color.name
                          ? `0 0 0 2px var(--surface), 0 0 0 4px ${color.value}`
                          : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Font size */}
              <div className="mb-5">
                <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  FONT SIZE
                </p>
                <div className="flex gap-2">
                  {FONT_SIZES.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => applyFontSize(f.value)}
                      className="flex-1 py-2 rounded-lg text-sm font-mono font-medium transition-all duration-200"
                      style={{
                        background: fontSize === f.value ? 'var(--accent)' : 'var(--surface-2)',
                        color: fontSize === f.value ? '#fff' : 'var(--text-secondary)',
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reduce motion */}
              <div>
                <p className="font-mono text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  ACCESSIBILITY
                </p>
                <button
                  onClick={toggleReduceMotion}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: 'var(--surface-2)', color: 'var(--text-primary)' }}
                >
                  <span className="text-sm font-medium flex-1 text-left">Reduce Motion</span>
                  <div
                    className="w-10 h-5 rounded-full relative transition-all duration-300"
                    style={{ background: reduceMotion ? 'var(--accent)' : 'var(--border-hover)' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300"
                      style={{ left: reduceMotion ? '22px' : '2px' }}
                    />
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
