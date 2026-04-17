import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lanre Sanni — CTO & AI Engineer',
    short_name: 'Lanre Sanni',
    description:
      'Strategic CTO and AI Engineer with 6+ years building scalable products across fintech, travel, and emerging technology.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['portfolio', 'technology', 'business'],
    lang: 'en',
    dir: 'ltr',
  };
}
