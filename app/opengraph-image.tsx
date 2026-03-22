import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lanre Sanni — CTO & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1220 60%, #0a1628 100%)',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)',
          }}
        />

        {/* Background hex grid (decorative dots) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 'auto',
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f8', letterSpacing: '-0.5px' }}>
            Lanre
          </span>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#3b82f6' }}>.</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '60px' }}>
          {/* Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                marginRight: '10px',
              }}
            />
            <span
              style={{
                fontSize: 15,
                color: 'rgba(240,240,248,0.5)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              Available for opportunities
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#f0f0f8',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              marginBottom: '24px',
            }}
          >
            CTO &amp;{' '}
            <span style={{ color: '#3b82f6' }}>AI Engineer</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: 'rgba(240,240,248,0.6)',
              marginBottom: '20px',
            }}
          >
            Sanni Olanrewaju
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: 'rgba(240,240,248,0.4)',
              lineHeight: 1.5,
              maxWidth: '700px',
            }}
          >
            Building scalable systems, AI agents, and engineering teams across fintech, travel, and emerging tech.
          </div>
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {[
            { value: '6+', label: 'Years Exp.' },
            { value: '40K+', label: 'Users Scaled' },
            { value: '2', label: 'Active CTOs' },
            { value: '4+', label: 'npm Packages' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#3b82f6' }}>{s.value}</span>
              <span style={{ fontSize: 13, color: 'rgba(240,240,248,0.35)', fontFamily: 'monospace', letterSpacing: '1px' }}>
                {s.label}
              </span>
            </div>
          ))}

          {/* URL right-aligned */}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ fontSize: 16, color: 'rgba(59,130,246,0.7)', fontFamily: 'monospace' }}>
              lanre-codes.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
