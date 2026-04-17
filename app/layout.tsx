import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SettingsPanel from '@/components/layout/SettingsPanel';
import CustomCursor from '@/components/layout/CustomCursor';
import AccentColorSync from '@/components/layout/AccentColorSync';
import SuppressWarnings from '@/components/layout/SuppressWarnings';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const BASE_URL = 'https://lanre-codes.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Lanre Sanni — CTO & AI Engineer',
    template: '%s | Lanre Sanni',
  },
  description:
    'Sanni Olanrewaju (Lanre) is a Strategic CTO and AI Engineer with 6+ years building scalable products across fintech, travel, and emerging technology. Expert in Next.js, Laravel, LLMs, and cloud infrastructure.',
  keywords: [
    'Lanre Sanni',
    'Sanni Olanrewaju',
    'CTO',
    'AI Engineer',
    'Backend Engineer',
    'Fintech',
    'Next.js',
    'Laravel',
    'Nigeria',
    'Lagos',
    'LLM',
    'AI Agents',
    'Software Engineer',
    'Full Stack',
    'Cloud Architecture',
    'AWS',
    'TypeScript',
    'React',
    'NestJS',
    'RAG Pipeline',
    'Vector Database',
    'MCP',
    'Chief Technology Officer',
    'Tech Lead',
    'Portfolio',
  ],
  authors: [{ name: 'Sanni Olanrewaju', url: 'https://github.com/oluwaeinstein007' }],
  creator: 'Sanni Olanrewaju',
  publisher: 'Sanni Olanrewaju',
  category: 'technology',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Lanre Sanni — CTO & AI Engineer',
    description:
      'Strategic CTO and AI Engineer building scalable systems, AI agents, and engineering teams across fintech, travel, and emerging tech.',
    url: BASE_URL,
    siteName: 'Lanre Sanni',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Lanre Sanni — CTO & AI Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lanre Sanni — CTO & AI Engineer',
    description:
      'Strategic CTO and AI Engineer building scalable systems, AI agents, and engineering teams.',
    creator: '@lanrecodes',
    site: '@lanrecodes',
    images: [
      {
        url: '/opengraph-image',
        alt: 'Lanre Sanni — CTO & AI Engineer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sanni Olanrewaju',
  alternateName: ['Lanre Sanni', 'Lanre Codes'],
  url: BASE_URL,
  image: `${BASE_URL}/profile/lanre.jpg`,
  jobTitle: 'Chief Technology Officer & AI Engineer',
  description:
    'Strategic CTO and AI Engineer with 6+ years building scalable products across fintech, travel, and emerging technology.',
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Large Language Models',
    'AI Agents',
    'Software Architecture',
    'Cloud Infrastructure',
    'Fintech',
    'Next.js',
    'Laravel',
    'TypeScript',
  ],
  sameAs: [
    'https://github.com/oluwaeinstein007',
    'https://linkedin.com/in/lanrecodes',
    'https://x.com/lanrecodes',
  ],
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Collo Africa',
      url: 'https://colloafrica.com',
    },
    {
      '@type': 'Organization',
      name: 'Travel Avatar',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lanre Sanni — CTO & AI Engineer',
  url: BASE_URL,
  description:
    'Personal portfolio and professional profile of Sanni Olanrewaju, CTO and AI Engineer.',
  author: {
    '@type': 'Person',
    name: 'Sanni Olanrewaju',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/#work`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos, Nigeria" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="lanre-theme"
        >
          <SuppressWarnings />
          <AccentColorSync />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SettingsPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
