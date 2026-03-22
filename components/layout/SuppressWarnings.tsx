'use client';

import { useEffect } from 'react';

/**
 * Suppresses known third-party deprecation warnings that are noise in the console
 * but do not affect functionality (e.g. THREE.Clock → THREE.Timer from @react-three/fiber).
 */
export default function SuppressWarnings() {
  useEffect(() => {
    const original = console.warn.bind(console);
    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === 'string' ? args[0] : '';
      if (msg.includes('THREE.Clock') || msg.includes('THREE.THREE')) return;
      original(...args);
    };
    return () => {
      console.warn = original;
    };
  }, []);

  return null;
}
