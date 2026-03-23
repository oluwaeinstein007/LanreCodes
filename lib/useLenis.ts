import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export function useLenis() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);
}
