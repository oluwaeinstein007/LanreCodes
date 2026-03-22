import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AccentColor = {
  name: string;
  value: string;
  label: string;
};

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'blue',   value: '#3B82F6', label: 'Electric Blue' },
  { name: 'emerald',value: '#10B981', label: 'Emerald' },
  { name: 'amber',  value: '#F59E0B', label: 'Amber' },
  { name: 'rose',   value: '#F43F5E', label: 'Rose' },
  { name: 'violet', value: '#8B5CF6', label: 'Violet' },
  { name: 'cyan',   value: '#06B6D4', label: 'Cyan' },
  { name: 'coral',  value: '#FF6B6B', label: 'Coral' },
  { name: 'lime',   value: '#84CC16', label: 'Lime' },
];

type AccentStore = {
  accent: AccentColor;
  setAccent: (color: AccentColor) => void;
};

export const useAccentColor = create<AccentStore>()(
  persist(
    (set) => ({
      accent: ACCENT_COLORS[0],
      setAccent: (color) => {
        set({ accent: color });
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--accent', color.value);
          // Update muted / glow variants
          document.documentElement.style.setProperty(
            '--accent-muted',
            color.value + '26'
          );
          document.documentElement.style.setProperty(
            '--accent-glow',
            color.value + '4d'
          );
        }
      },
    }),
    { name: 'accent-color' }
  )
);

/** Call this once on mount to sync persisted value to CSS */
export function applyAccentColor(value: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--accent', value);
  document.documentElement.style.setProperty('--accent-muted', value + '26');
  document.documentElement.style.setProperty('--accent-glow', value + '4d');
}
