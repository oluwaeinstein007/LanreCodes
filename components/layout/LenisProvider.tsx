'use client';

import { useLenis } from '@/lib/useLenis';

/** Initialises Lenis smooth scroll. Renders nothing — side-effects only. */
export default function LenisProvider() {
  useLenis();
  return null;
}
