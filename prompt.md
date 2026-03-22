You are an expert Senior Full-Stack Engineer and Creative Developer
specializing in Next.js, Three.js, and Framer Motion.

Build a high-performance, visually stunning, and interactive personal
portfolio website that feels genuinely premium — not a template.

---

## TECH STACK

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS with CSS variables for all design tokens
- React Three Fiber + Three.js (3D elements)
- Framer Motion (all animations and page transitions)
- Lenis (high-end inertial smooth scrolling)
- next-themes (dark/light mode)
- Lucide React (icons)
- Google Fonts via next/font

---

## DESIGN IDENTITY

Aesthetic: Refined dark-by-default editorial. Premium digital magazine
meets developer portfolio. Controlled maximalism in the hero, clean
geometry everywhere else.

Typography:

- Display/Heading: "Syne" (bold, geometric)
- Body: "DM Sans" (humanist, readable)
- Monospace labels: "JetBrains Mono"
- Load all via next/font/google

Color Tokens (CSS variables in globals.css):
:root {
--bg: #f5f4f0;
--surface: #ffffff;
--border: rgba(0,0,0,0.08);
--text-primary: #0a0a0f;
--text-secondary: #6b7280;
--accent: #3b82f6;
}

[data-theme="dark"] {
--bg: #0a0a0f;
--surface: #12121a;
--border: rgba(255,255,255,0.08);
--text-primary: #f5f4f0;
--text-secondary: #9ca3af;
--accent: #3b82f6;
}

All theme transitions:

- { transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }

---

## GLASSMORPHISM SYSTEM

Apply this pattern consistently to: Navbar, Cards, Settings Panel,
Modal overlays, Skill badges.

Tailwind class pattern:
bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20

Navbar specifically:
fixed top-0, full width, backdrop-blur-md, semi-transparent bg,
shrinks in padding after 80px scroll (useScroll + Framer Motion)

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
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 \* t)) })
function raf(time: number) {
lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
return () => lenis.destroy()
}, [shouldReduceMotion])
}

Initialize in app/layout.tsx via a client component wrapper.
Pause Lenis when a modal or overlay is open.

---

## ACCENT COLOR SYSTEM

8 accent options:
Electric Blue #3B82F6
Emerald #10B981
Amber #F59E0B
Rose #F43F5E
Violet #8B5CF6
Cyan #06B6D4
Coral #FF6B6B
Lime #84CC16

Implementation (no Context provider needed):

// On selection:
document.documentElement.style.setProperty('--accent', selectedColor)
localStorage.setItem('accent-color', selectedColor)

// On mount (in layout.tsx client wrapper):
const saved = localStorage.getItem('accent-color')
if (saved) document.documentElement.style.setProperty('--accent', saved)

In Tailwind, reference as: text-[var(--accent)], bg-[var(--accent)],
border-[var(--accent)]

The accent color must cascade to:

- All CTA buttons (bg fill or border)
- Nav active indicator underline
- Skill badge borders
- Link hover states
- Three.js mesh emissive color (sync via useThree + useEffect watching accent)
- Focus rings on form inputs
- Timeline dot indicators
- Stat counter numbers

---

## SETTINGS PANEL

Floating ⚙️ icon fixed bottom-right. On click: smooth slide-up panel.

Contains:

1. Dark / Light toggle (animated sun↔moon icon swap, Framer Motion)
2. Accent color picker: row of 8 colored circles, active one has
   a white/dark ring + scale-up animation
3. Font size: Small (14px base) / Medium (16px) / Large (18px)
   → updates: document.documentElement.style.fontSize = size
4. Reduce Motion toggle → sets a global state that disables all
   Framer Motion animations (pass to AnimatePresence and variants)

Panel itself uses the glassmorphism pattern.

---

## NAVIGATION

- Fixed top, glassmorphism background
- Logo: name/initials in Syne font, left-aligned
- Links: Home · About · Work · Skills · Contact
- Active link: thin accent-colored underline that slides between
  items using Framer Motion layoutId="nav-indicator"
- Mobile: hamburger → full-screen overlay with staggered link entrance
- Scroll-aware: padding shrinks from py-5 to py-3 after 80px

---

## HERO SECTION

Full-viewport height. Two-column layout.

Left column:

- Headline (split into words, staggered upward reveal on load):
  "I build things for the web."
- Subheadline with typewriter effect cycling: "Software Engineer" /
  "CTO" / "AI Builder" / "Tech Leader"
- Two CTAs: filled accent button "View My Work" + ghost "Download CV"
- Pulsing green dot + "Available for opportunities" badge

Right column — 3D Hero Canvas:
Use React Three Fiber. Render a slowly rotating torus knot or
icosahedron (NOT low-poly terrain — avoid it, it reads as dated).

Canvas setup:
<Canvas
camera={{ position: [0, 0, 5], fov: 45 }}
gl={{ antialias: true, alpha: true }} >
<AdaptiveEvents />
<Preload all />
<Suspense fallback={<Html>Loading...</Html>}>
<HeroShape />
<ambientLight intensity={0.4} />
<pointLight position={[10, 10, 10]} intensity={1} />
<Environment preset="city" />
</Suspense>
</Canvas>

HeroShape behavior: - Wireframe or MeshStandardMaterial with emissiveIntensity 0.4 - emissive color = current --accent value (read via
getComputedStyle and synced on accent change) - Auto-rotates slowly on Y and X axes (useFrame) - Mouse parallax: lerped rotation following cursor position
(useMousePosition hook → lerp toward target each frame) - frameloop="demand" on Canvas, switched to "always" on hover - Hidden on mobile (CSS), scaled down on tablet

Global particle background (hero page only): - Points geometry, ~800 particles, drifting slowly - Opacity: 0.08 in light mode, 0.18 in dark mode - Paused when reduce-motion is enabled

---

## ABOUT SECTION

Two-column: left = photo, right = text.

Photo:

- Displayed in a clipped polygon frame OR accent-colored border
- Subtle grain texture overlay (CSS noise filter or SVG feTurbulence)

Right:

- Bio paragraphs, staggered fade-in on scroll (whileInView, once: true)
- "Currently at" badge with company + role

Stats row (animated count-up on viewport entry):
Years of Experience | Projects Shipped | Team Size | Repos

Timeline:

- Vertical timeline, alternating left/right on desktop
- Each entry: role, company, dates, 2–3 bullets
- Items slide in from alternating sides via Framer Motion

---

## PROJECTS SECTION — BENTO GRID

Use a bento-style grid (NOT uniform card grid):

- 2–3 column CSS grid with varied row spans
- Featured project: spans 2 columns, taller row
- Secondary projects: single cells

Each card:

- Full-bleed cover image or gradient placeholder
- Title, short description, tech stack pills (accent-colored border)
- Hover: 3D tilt effect (react-tilt or manual transform via
  onMouseMove → rotateX/rotateY via Framer Motion style prop)
- Hover overlay: semi-transparent dark layer + "View Project →" CTA
- Card entrance: staggered fade+translateY with Framer Motion

Filter tabs: All · Web · Mobile · AI/ML · Open Source
Active tab: accent background fill, animated with layoutId

---

## SKILLS SECTION

3D Floating Tag Cloud:
Option A (preferred): React Three Fiber sphere with skill name sprites
distributed across surface via fibonacci sphere algorithm. Slowly
auto-rotates. Hover pauses and highlights skill.

Option B (fallback): Framer Motion floating tags with varied
opacity/scale to simulate depth.

Below the 3D element:

- Skill categories: Languages · Frameworks · Cloud & DevOps · AI Tools
- Each skill: horizontal fill bar animated on scroll entry, OR
  icon+label pill cards with accent border
- Proficiency label: Expert / Proficient / Familiar

---

## CONTACT SECTION

Layout: Clean, minimal, centered.

Headline: "Let's Build Something Together"

Form fields: Name, Email, Subject, Message

- Floating label inputs (CSS-only, label moves up on focus/fill)
- Accent-colored focus rings: ring-2 ring-[var(--accent)]
- Submit button: accent fill, loading spinner state,
  success ("Message sent ✓") and error states

Social links: GitHub · LinkedIn · Twitter/X · Email

- Large icon buttons, hover: accent color + translateY(-2px)

Small 3D element: rotating abstract shape or envelope,
accent emissive, same pattern as hero shape.

---

## PAGE TRANSITIONS

Use Framer Motion AnimatePresence in app/layout.tsx.
Transition style: diagonal wipe OR fade + slight Y translate.

variants={{
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -10, transition: { duration: 0.25 } }
  }}

---

## CUSTOM CURSOR

Render a small dot (8px) and a larger ring (32px) that follows the mouse
with different lerp speeds (dot: instant, ring: laggy for trail effect).

On hover over interactive elements: ring scales to 48px,
fills with accent color at 20% opacity.

Hide on mobile/touch devices.
Use a global useMousePosition hook. Render in layout.tsx outside
the main content.

---

## PERFORMANCE RULES

- All images: next/image with correct width/height and priority on hero
- Three.js canvas: frameloop="demand" default, "always" on interaction
- Wrap all R3F scenes in <Suspense fallback={...}>
- Lazy load non-hero 3D sections with dynamic(() => import(...), { ssr: false })
- will-change: transform on animated elements, removed after animation
- Lenis paused during page transitions
- reduce-motion toggle disables ALL Framer Motion variants globally
- AdaptiveEvents + Preload on every Canvas

---

## FILE STRUCTURE

app/
layout.tsx → Root: ThemeProvider, Lenis init, fonts,
CustomCursor, Navbar, SettingsPanel
page.tsx → Home: Hero + section previews
about/page.tsx
work/page.tsx
skills/page.tsx
contact/page.tsx

components/
layout/
Navbar.tsx
Footer.tsx
SettingsPanel.tsx
CustomCursor.tsx
PageTransition.tsx
LenisProvider.tsx
home/
HeroSection.tsx
HeroCanvas.tsx → R3F torus knot / icosahedron
ParticleBackground.tsx
about/
AboutBio.tsx
Timeline.tsx
StatCounter.tsx
work/
BentoGrid.tsx
ProjectCard.tsx
FilterTabs.tsx
skills/
SkillsCloud.tsx → R3F sphere or Framer Motion tag cloud
SkillCategory.tsx
contact/
ContactForm.tsx
SocialLinks.tsx
ui/
Button.tsx
Tag.tsx
SectionHeading.tsx
AccentColorPicker.tsx
ThemeToggle.tsx

lib/
useLenis.ts
useMousePosition.ts
useAccentColor.ts
useReducedMotion.ts
data/
projects.ts
skills.ts
timeline.ts

styles/
globals.css → CSS variables, theme tokens, glassmorphism
utilities, cursor styles, noise texture

---

## DATA INTERFACES

// projects.ts
interface Project {
id: string
title: string
description: string
tags: string[]
category: 'web' | 'mobile' | 'ai' | 'opensource'
image: string
liveUrl?: string
githubUrl?: string
featured: boolean
span?: 'single' | 'wide' // for bento grid
}

// timeline.ts
interface TimelineEntry {
role: string
company: string
period: string
bullets: string[]
accent?: boolean // highlights the most recent entry
}

// skills.ts
interface Skill {
name: string
category: 'languages' | 'frameworks' | 'cloud' | 'ai' | 'design'
level: 'expert' | 'proficient' | 'familiar'
icon?: string
}

---

## OUTPUT INSTRUCTIONS

- Generate ALL files in the structure above — no placeholders
- Use realistic sample content, not Lorem Ipsum
- Dark mode is the default; both modes must have excellent contrast
- Settings panel must be fully functional end-to-end
- All 3D elements must actually render and animate — no stubs
- Lenis, glassmorphism, bento grid, and custom cursor are non-negotiable
- TypeScript strict mode throughout, all components fully typed
- Every interactive element has a deliberate, designed hover state
- Mobile-first responsive, explicit sm/md/lg/xl breakpoints throughout
