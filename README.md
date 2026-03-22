# Lanre Sanni — Portfolio

Personal portfolio website for **Sanni Olanrewaju (Lanre)** — CTO & AI Engineer. A premium, single-page dark-mode experience built with Next.js 16, Three.js, and Framer Motion.

**Live sections:** Hero → About → Experience → Work → Skills → Contact

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.1 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D / WebGL | React Three Fiber + @react-three/drei + Three.js |
| Theme | next-themes (dark/light toggle) |
| State | Zustand with persist middleware |
| Icons | Lucide React |
| Fonts | Syne · DM Sans · JetBrains Mono (Google Fonts) |

---

## Features

- **Single-page layout** — smooth scroll navigation with IntersectionObserver active-link tracking
- **3D Hero icosahedron** — wireframe mesh with mouse parallax via React Three Fiber
- **3D Skills globe** — Fibonacci sphere distribution of skill tags, auto-rotating
- **Particle background** — Three.js 600-point particle cloud on the hero
- **Custom cursor** — lerped ring + dot cursor, expands on interactive elements
- **Settings panel** — theme toggle, 8 accent colours, font size, reduce-motion
- **Glassmorphic navbar** — shrinks on scroll, active section highlighted
- **Animated stat counters** — count-up on scroll into view
- **Alternating section backgrounds** — clear visual separation between sections
- **Fully responsive** — mobile menu overlay, responsive grid layouts

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout — fonts, ThemeProvider, global providers
│   └── page.tsx                # Single page — all sections composed here
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Fixed glassmorphic nav with scroll-spy
│   │   ├── Footer.tsx              # Social links footer
│   │   ├── CustomCursor.tsx        # Lerped dot + ring cursor
│   │   ├── SettingsPanel.tsx       # Floating preferences panel
│   │   ├── PageTransition.tsx      # Framer Motion page wrapper
│   │   ├── AccentColorSync.tsx     # Syncs Zustand accent colour to CSS vars
│   │   └── SuppressWarnings.tsx    # Filters third-party console noise
│   ├── home/
│   │   ├── HeroSection.tsx         # Headline, typewriter, CTAs, stats
│   │   ├── HeroCanvas.tsx          # R3F icosahedron
│   │   ├── ParticleBackground.tsx  # Three.js particle cloud
│   │   └── ParticleBackgroundClient.tsx  # SSR-safe dynamic wrapper
│   ├── about/
│   │   ├── AboutBio.tsx            # Photo, bio text, quick-facts grid
│   │   ├── Timeline.tsx            # Alternating career timeline
│   │   ├── StatCounter.tsx         # Animated count-up stats
│   │   └── SpeakingSection.tsx     # Speaking engagement cards
│   ├── work/
│   │   ├── ProjectGrid.tsx         # Filtered project grid
│   │   ├── ProjectCard.tsx         # Card with gradient fallback + hover CTA
│   │   └── FilterTabs.tsx          # Animated category filter tabs
│   ├── skills/
│   │   ├── SkillsGlobe.tsx         # R3F Fibonacci sphere
│   │   ├── SkillsGlobeClient.tsx   # SSR-safe dynamic wrapper
│   │   └── SkillCategory.tsx       # Skill bars by category
│   ├── contact/
│   │   ├── ContactForm.tsx         # Floating-label form with states
│   │   └── SocialLinks.tsx         # GitHub, LinkedIn, Twitter, Email cards
│   └── ui/
│       ├── Button.tsx              # Primary / ghost / outline variants
│       ├── Tag.tsx                 # Tech stack pill
│       └── SectionHeading.tsx      # Label + heading + animated underline
├── lib/
│   ├── useAccentColor.ts       # Zustand store — 8 accent colours + CSS sync
│   ├── useReduceMotion.ts      # Zustand store — reduce-motion toggle
│   ├── useMousePosition.ts     # Mouse position hook
│   └── data/
│       ├── projects.ts         # Project entries
│       ├── timeline.ts         # Career timeline entries
│       ├── skills.ts           # Skill categories and proficiency levels
│       └── speaking.ts         # Speaking events
├── styles/
│   └── globals.css             # CSS variables, design tokens, cursor, glassmorphism
└── public/
    ├── cv/                     # Resume PDF
    ├── profile/                # Profile photos
    └── speaking/               # Speaking event images
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and pnpm

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:3000

# Production build
pnpm build
pnpm start
```

---

## Customisation

### Personal data
All content is data-driven — edit these files without touching any component:

| File | What it controls |
|---|---|
| `lib/data/projects.ts` | Work / project cards |
| `lib/data/timeline.ts` | Experience timeline entries |
| `lib/data/skills.ts` | Skill categories and proficiency levels |
| `lib/data/speaking.ts` | Speaking engagement cards |
| `components/contact/SocialLinks.tsx` | Social handles and links |
| `app/layout.tsx` | Site metadata (title, description, OG tags) |

### Accent colours
Eight accent colours are defined in `lib/useAccentColor.ts`. Add or change colours in the `ACCENT_COLORS` array — they appear automatically in the settings panel.

### Resume
Replace `public/cv/Sanni_Lanre_Resume.pdf` with an updated PDF. The download links in the navbar and hero both point to this path.

### Profile photo
Replace files in `public/profile/`. The About section uses `profile.jpg` by default.

---

## Design Tokens

All colours are CSS custom properties defined in `styles/globals.css`:

```css
--bg             /* Page background       */
--surface        /* Card / panel bg       */
--surface-2      /* Subtle nested bg      */
--border         /* Border colour         */
--text-primary   /* Main text             */
--text-secondary /* Muted text            */
--text-tertiary  /* Very muted text       */
--accent         /* Brand accent colour   */
--accent-muted   /* Accent at ~15% alpha  */
--accent-glow    /* Accent at ~30% alpha  */
```

Dark mode is the default. Light mode overrides are under `[data-theme="light"]`.

---

## Deployment

Deploys to Vercel with zero configuration:

```bash
npm i -g vercel
vercel
```

For other platforms (Netlify, Railway, etc.) run `pnpm build` — output is in `.next/`.

---

## Notes

- **Next.js 16 + `ssr: false`** — Dynamic imports with `ssr: false` must live inside a `'use client'` component. All Three.js canvases use a thin `*Client.tsx` wrapper for this reason.
- **Contact form** — Currently logs to the console. Wire up a real backend (Resend, EmailJS, or a Next.js API route) in `components/contact/ContactForm.tsx`.
- **Project images** — Cards use CSS gradient fallbacks by category. Add real screenshots to `public/projects/` and set the `image` field in `lib/data/projects.ts`.
