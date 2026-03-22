'use client';

import { useEffect } from 'react';
import { useAccentColor, applyAccentColor } from '@/lib/useAccentColor';

/**
 * Syncs persisted accent color from localStorage to CSS variables on mount.
 * Prevents flash of default accent color after hydration.
 */
export default function AccentColorSync() {
  const { accent } = useAccentColor();

  useEffect(() => {
    applyAccentColor(accent.value);
  }, [accent.value]);

  return null;
}
