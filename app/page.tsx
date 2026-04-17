import ParticleBackgroundClient from '@/components/home/ParticleBackgroundClient';
import HeroSection from '@/components/home/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import AboutBio from '@/components/about/AboutBio';
import StatCounter from '@/components/about/StatCounter';
import Timeline from '@/components/about/Timeline';
import SpeakingSection from '@/components/about/SpeakingSection';
import ProjectGrid from '@/components/work/ProjectGrid';
import SkillsGlobeClient from '@/components/skills/SkillsGlobeClient';
import SkillCategory from '@/components/skills/SkillCategory';
import { skillCategories } from '@/lib/data/skills';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';

/* Shared inline styles so centering works regardless of CSS-layer cascade */
const container: React.CSSProperties = {
  width: '100%',
  maxWidth: '72rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 'clamp(1.5rem, 5vw, 3rem)',
  paddingRight: 'clamp(1.5rem, 5vw, 3rem)',
  paddingTop: '6rem',
  paddingBottom: '6rem',
};

const containerNarrow: React.CSSProperties = {
  ...container,
  maxWidth: '64rem',
};

export default function HomePage() {
  return (
    <>
      <ParticleBackgroundClient />

      {/* ── Hero ── */}
      <section id="hero" aria-label="Introduction" style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
      </section>

      {/* ── About ── */}
      <section id="about" aria-label="About Lanre Sanni" style={{ background: 'var(--surface)' }}>
        <div style={container}>
          <SectionHeading
            label="Who I am"
            title="About Me"
            subtitle="Engineer, Leader, Builder — obsessed with systems that scale."
          />
          <AboutBio />
          <StatCounter />

          <div id="experience" style={{ marginTop: '6rem', scrollMarginTop: '5rem' }}>
            <SectionHeading label="Career path" title="Experience" />
            <Timeline />
          </div>

          <div style={{ marginTop: '6rem' }}>
            <SectionHeading
              label="Public speaking"
              title="On Stage"
              subtitle="Sharing knowledge across AI, fintech, and startup tech."
            />
            <SpeakingSection />
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" aria-label="Projects and Work" style={{ background: 'var(--bg)' }}>
        <div style={container}>
          <SectionHeading
            label="My projects"
            title="Work"
            subtitle="A curated selection of products, AI agents, and systems I've built or led."
          />
          <ProjectGrid />
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" aria-label="Skills and Technologies" style={{ background: 'var(--surface)' }}>
        <div style={container}>
          <SectionHeading
            label="My toolbox"
            title="Skills"
            subtitle="Languages, frameworks, AI tools, and cloud infrastructure I work with daily."
          />
          <div
            style={{
              marginBottom: '4rem',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
            }}
          >
            <SkillsGlobeClient />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, i) => (
              <SkillCategory key={cat.category} category={cat} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" aria-label="Contact Lanre Sanni" style={{ background: 'var(--bg)' }}>
        <div style={containerNarrow}>
          <SectionHeading
            label="Get in touch"
            title="Let's Build Something Together"
            subtitle="Have a project, opportunity, or idea? I'd love to hear from you."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-4">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <div>
                <p
                  className="font-mono text-xs mb-4 tracking-widest uppercase"
                  style={{ color: 'var(--accent)' }}
                >
                  Connect with me
                </p>
                <SocialLinks />
              </div>
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Availability
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Open to new opportunities
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  I'm currently available for CTO advisory roles, AI engineering contracts,
                  speaking engagements, and interesting collaborations. Response time: 24–48h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
