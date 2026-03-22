'use client';

import { useEffect, useRef, useState } from 'react';
import { useReduceMotionStore } from '@/lib/useReduceMotion';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useReduceMotionStore();
  const [active, setActive] = useState(false); // hide until first mouse move

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setActive(true);
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      if (reduceMotion) {
        ring.style.left = mouseX + 'px';
        ring.style.top = mouseY + 'px';
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animId = requestAnimationFrame(animate);
    };

    if (!reduceMotion) {
      animId = requestAnimationFrame(animate);
    }

    const onEnter = () => {
      dot.classList.add('hover');
      ring.classList.add('hover');
    };
    const onLeave = () => {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    };

    const interactives = 'a, button, [role="button"], input, textarea, label, select, [data-cursor-hover]';

    document.addEventListener('mousemove', onMove, { passive: true });

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactives).forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: active ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: active ? 1 : 0 }}
      />
    </>
  );
}
