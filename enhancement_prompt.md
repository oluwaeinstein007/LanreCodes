Enhance the portfolio with the following additions:

---

## LENIS SMOOTH SCROLLING

Install: npm install @studio-freight/lenis

Create lib/useLenis.ts:

import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export function useLenis() {
const shouldReduceMotion = useReducedMotion()
useEffect(() => {
if (shouldReduceMotion) return
const lenis = new Lenis({
duration: 1.2,
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 \* t))
})
function raf(time: number) {
lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
return () => lenis.destroy()
}, [shouldReduceMotion])
}

Initialize in app/layout.tsx via a client component wrapper.
Pause Lenis during page transitions and when overlays are open.

---

## GLASSMORPHISM SYSTEM

Apply this Tailwind pattern to: Navbar, Cards, Settings Panel,
Modal overlays, and Skill badges:

bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20

Navbar specifically: fixed top-0, full width, backdrop-blur-md,
semi-transparent bg, padding shrinks from py-5 to py-3 after
80px scroll using useScroll + Framer Motion.

---

## ACCENT COLOR — CSS VARIABLE IMPLEMENTATION

Do NOT use a Context provider. Use direct DOM mutation:

// On selection:
document.documentElement.style.setProperty('--accent', selectedColor)
localStorage.setItem('accent-color', selectedColor)

// On mount in layout.tsx client wrapper:
const saved = localStorage.getItem('accent-color')
if (saved) document.documentElement.style.setProperty('--accent', saved)

Reference in Tailwind as:
text-[var(--accent)]
bg-[var(--accent)]
border-[var(--accent)]
ring-[var(--accent)]

The accent must cascade to: CTA buttons, nav active underline,
skill badge borders, link hovers, Three.js mesh emissive color
(sync via getComputedStyle on accent change), form focus rings,
timeline dots, and stat counter numbers.

---

## 3D HERO SHAPE — UPGRADE RULES

Use a torus knot or icosahedron. Do NOT use low-poly terrain.

Canvas setup:
<Canvas
camera={{ position: [0, 0, 5], fov: 45 }}
gl={{ antialias: true, alpha: true }}
frameloop="demand"

>

    <AdaptiveEvents />
    <Preload all />
    <Suspense fallback={<Html>Loading...</Html>}>
      <HeroShape />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
    </Suspense>

  </Canvas>

HeroShape rules:

- MeshStandardMaterial, emissiveIntensity 0.4
- emissive color synced to current --accent CSS variable
- Auto-rotates on Y and X axes via useFrame
- Mouse parallax: lerped rotation following cursor each frame
- frameloop switches from "demand" to "always" on hover
- Hidden on mobile, scaled on tablet

---

## BENTO GRID FOR PROJECTS

Replace uniform card grid with a bento-style CSS grid:

- 2–3 column grid with varied row spans
- Featured project spans 2 columns, taller row height
- Secondary projects fill single cells

Each card hover:

- 3D tilt effect via onMouseMove → rotateX/rotateY
  using Framer Motion style prop
- Semi-transparent overlay + "View Project →" CTA appears
- Card entrance: staggered fade + translateY

Add span field to Project type:
span?: 'single' | 'wide'

---

## CUSTOM CURSOR

Two layers:

- Small dot (8px): follows mouse instantly
- Larger ring (32px): follows with lerp lag for trail effect

On hover over interactive elements:

- Ring scales to 48px
- Ring fills with accent color at 20% opacity

Hide on mobile and touch devices via:
@media (hover: none) { cursor: auto; .custom-cursor { display: none; } }

Use a global useMousePosition hook.
Render in layout.tsx outside main content.

---

## R3F PERFORMANCE RULES

- frameloop="demand" by default on all Canvas elements,
  switch to "always" only during active interaction
- Wrap all R3F scenes in <Suspense fallback={...}>
- Lazy load non-hero 3D sections:
  dynamic(() => import('../components/skills/SkillsCloud'), { ssr: false })
- AdaptiveEvents + Preload on every Canvas
- will-change: transform on animated elements,
  removed after animation completes
