Build a complete, production-ready personal portfolio website in Next.js (App Router) with the following features, design system, and pages. The website should feel alive, immersive, and distinctly premium — not a generic template.

---

## TECH STACK

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS (with CSS variables for theming)
- Framer Motion (for all animations and transitions)
- Three.js or React Three Fiber (for 3D elements)
- next-themes (for dark/light mode)
- Zustand or React Context (for accent color state)
- Lucide React (icons)
- Google Fonts via next/font

---

## DESIGN IDENTITY

**Aesthetic Direction:** Refined dark-by-default editorial — think a premium digital magazine meets developer portfolio. Clean geometry, deliberate whitespace, and controlled maximalism in the hero.

**Typography:**

- Display/Heading font: "Syne" (bold, geometric, modern)
- Body font: "DM Sans" (humanist, readable)
- Monospace/Code labels: "JetBrains Mono"
- Load all via next/font/google

**Theming:**

- Dark mode default: Background #0a0a0f, surface #12121a, borders with low opacity white
- Light mode: Background #f5f4f0 (warm off-white), surface #ffffff, borders with low opacity black
- CSS variables for all color tokens: --bg, --surface, --border, --text-primary, --text-secondary, --accent
- Smooth theme transitions on all elements (transition: background 0.3s, color 0.3s)

**Accent Color System:**

- User can choose their preferred accent color from a palette of 6–8 options
- Options: Electric Blue (#3B82F6), Emerald (#10B981), Amber (#F59E0B), Rose (#F43F5E), Violet (#8B5CF6), Cyan (#06B6D4), Coral (#FF6B6B), Lime (#84CC16)
- The selected accent color cascades across: links, hover states, active nav items, skill badges, CTA buttons, and 3D element emissive color
- Persist the selection to localStorage
- Display as a row of circular color swatches in the settings panel

---

## SETTINGS PANEL

A small floating settings icon (⚙️ or sliders icon) fixed to the bottom-right corner. On click, a smooth slide-up panel appears with:

- Dark / Light theme toggle (with animated sun/moon icon swap)
- Accent color selector (row of colored circles, currently active one has a ring)
- Font size nudge: Small / Medium / Large (affects base rem)
- Reduce motion toggle (disables Framer Motion animations system-wide)
- Close button

---

## NAVIGATION

- Fixed top navbar, blurred glass background (backdrop-blur-md, semi-transparent bg)
- Logo: initials or name in the display font, left-aligned
- Nav links: Home, About, Work, Skills, Blog (or Writing), Contact
- Active link underline using a thin accent-colored line that slides between items (layout animation via Framer Motion)
- Mobile: hamburger menu → full-screen overlay nav with staggered link entrance
- Subtle scroll-aware behavior: navbar shrinks slightly in height after scrolling 80px

---

## PAGE: HOME (HERO)

**Hero Section:**

- Full-viewport height
- Large typographic headline: "I build things for the web." or equivalent — split into words, each word animates in with a staggered upward reveal on load
- Subheadline with typewriter effect cycling between roles: "Software Engineer", "CTO", "AI Builder", "Tech Leader"
- Two CTAs: "View My Work" (accent-filled button) and "Download CV" (ghost button)
- Floating availability badge: pulsing green dot + "Available for opportunities"

**3D Hero Element:**

- A slowly rotating abstract 3D geometric object (e.g., an icosahedron or torus knot) rendered with React Three Fiber
- Positioned to the right side of the hero, partially behind the text layer
- Responsive: hidden on mobile, scaled on tablet
- Material: Wireframe or low-poly with emissive color matching the accent color
- Reacts to mouse movement (lerped rotation following cursor — parallax effect)
- In light mode: slightly more opaque; in dark mode: glowing with bloom/emissive

**Scroll Indicator:**

- Animated downward chevron or scroll line at bottom of hero

---

## PAGE: ABOUT

- Two-column layout: left = photo/avatar section, right = text
- Photo: Displayed in a stylized frame — either a clipped polygon shape or with a subtle accent-border + grain texture overlay
- Bio paragraphs with staggered fade-in on scroll (Framer Motion `whileInView`)
- "Currently at" company with logo + role title
- Quick stats row: Years of Experience | Projects Shipped | Team Size | Open Source Repos — animated number count-up when in viewport
- Timeline section below: Career history as a vertical timeline with alternating left/right layout on desktop, single column on mobile. Each entry: role, company, dates, 2–3 bullet points. Entrance animation: items slide in from alternating sides.

---

## PAGE: WORK / PROJECTS

- Section heading with a subtle animated underline drawn via SVG stroke animation
- Project grid: 2 columns on desktop, 1 on mobile
- Each project card:
  - Full-bleed cover image or gradient placeholder
  - Project title, short description, tech stack tags (small pills in accent color)
  - Hover: card lifts with box-shadow, overlay appears with "View Project →" CTA
  - Framer Motion: scale and shadow on hover, card entrance with staggered delay
- "Featured Project" variant: full-width card for the most important project, with a larger image and more prominent layout
- Filter tabs at the top: All | Web Apps | Mobile | AI / ML | Open Source

---

## PAGE: SKILLS

**3D Skills Globe or Floating Tags:**
Option A: A sphere rendered in Three.js/R3F with skill names distributed across its surface as floating text sprites. The sphere slowly auto-rotates; hover pauses rotation and highlights hovered skill.
Option B (simpler): An animated tag cloud using Framer Motion with skills floating and bobbing at different speeds, subtle depth created via opacity and font-size variation.

Below the 3D element:

- Categorized skill sections: Languages, Frameworks, Cloud & DevOps, AI/ML Tools, Design Tools
- Each skill shown as a horizontal bar with fill animation on scroll, or as icon+label pill cards
- Proficiency levels: Expert / Proficient / Familiar

---

## PAGE: CONTACT

- Clean, minimal layout
- Headline: "Let's Build Something Together"
- Contact form with fields: Name, Email, Subject, Message
  - Styled inputs with floating labels (CSS-only)
  - Accent-colored focus rings
  - Submit button with loading spinner state and success/error feedback
- Social links row: GitHub, LinkedIn, Twitter/X, Email — large icon buttons with hover lift effect
- A subtle 3D element: a small animated envelope or abstract shape that rotates in place

---

## GLOBAL 3D BACKGROUND (Optional but excellent)

- On the home page only: a subtle full-viewport canvas behind the main content
- Renders slowly drifting particles (points geometry in Three.js) or low-poly floating shapes
- Very low opacity in light mode (5–10%), more visible in dark mode (15–20%)
- Pause when reduce-motion is enabled

---

## ANIMATIONS & INTERACTIONS

- Page transitions: Framer Motion `AnimatePresence` with a diagonal wipe or fade+slide between routes
- Section entrance: every section uses `whileInView` with `once: true`, `viewport: { amount: 0.2 }`
- Staggered children: use `variants` with `staggerChildren` for lists, grids, and nav items
- Cursor: custom cursor dot that follows the mouse (small circle, scales up over interactive elements)
- Smooth scroll: native CSS `scroll-behavior: smooth`
- Hover states: all interactive elements have a deliberate, distinctive hover animation (never just opacity)

---

## PERFORMANCE & BEST PRACTICES

- All images use next/image with proper sizing
- Three.js canvas uses `frameloop="demand"` to only render when needed
- Lazy-load heavy sections with `React.lazy` + `Suspense`
- 3D elements wrapped in `<Suspense fallback={...}>` with a skeleton loader
- Dark/light mode uses `next-themes` with `suppressHydrationWarning` on `<html>`
- Accent color stored in localStorage and rehydrated client-side to avoid flash
- Responsive breakpoints: mobile-first, with explicit sm/md/lg/xl Tailwind variants
- Use `will-change: transform` on animated elements, remove after animation completes
- Semantic HTML throughout: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`
- ARIA labels on icon buttons and interactive 3D canvases

---

## FILE STRUCTURE

app/
layout.tsx → Root layout: ThemeProvider, fonts, CustomCursor, Navbar, SettingsPanel
page.tsx → Home: Hero + brief previews of Work and About
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
home/
HeroSection.tsx
HeroCanvas.tsx → R3F 3D geometric object
ParticleBackground.tsx
about/
AboutBio.tsx
Timeline.tsx
StatCounter.tsx
work/
ProjectGrid.tsx
ProjectCard.tsx
FilterTabs.tsx
skills/
SkillsGlobe.tsx → R3F skills sphere
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
useAccentColor.ts → Zustand store or context for accent color
useMousePosition.ts → Hook for cursor/parallax tracking
data/
projects.ts
skills.ts
timeline.ts

styles/
globals.css → CSS variables, theme tokens, custom cursor, smooth scroll

---

## DATA SHAPE EXAMPLES

// projects.ts
export const projects = [
{
id: "1",
title: "Project Name",
description: "Short description of what this does and the impact it had.",
tags: ["Next.js", "TypeScript", "AWS"],
category: "web",
image: "/projects/project-1.jpg",
liveUrl: "https://...",
githubUrl: "https://...",
featured: true,
}
]

// timeline.ts
export const timeline = [
{
role: "CTO",
company: "Collo Africa",
period: "2023 – Present",
bullets: [
"Led engineering team of 7 across backend, frontend, and mobile",
"Architected AWS infrastructure scaling from 2K to 20K+ users",
]
}
]

---

## OUTPUT INSTRUCTIONS

- Generate all files listed in the file structure above
- Every component should be fully functional, not a placeholder
- Use realistic sample content (not Lorem Ipsum)
- All animations should be smooth, intentional, and performant
- Dark mode should be the default, with excellent contrast ratios in both modes
- The settings panel should be functional end-to-end (theme, accent, font size all working)
- The 3D elements must actually render and animate — no static screenshots or stubs
- All code should be TypeScript-strict with proper types and interfaces
