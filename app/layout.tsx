import type { Metadata } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
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
  title: 'Lanre Sanni — CTO & AI Engineer',
  description:
    'Strategic CTO and AI Engineer with 6+ years building scalable products across fintech, travel, and emerging technology.',
  keywords: ['CTO', 'AI Engineer', 'Backend', 'Fintech', 'Next.js', 'Laravel', 'Nigeria'],
  authors: [{ name: 'Sanni Olanrewaju', url: 'https://github.com/oluwaeinstein007' }],
  openGraph: {
    title: 'Lanre Sanni — CTO & AI Engineer',
    description: 'Building scalable systems, AI agents, and engineering teams.',
    url: BASE_URL,
    siteName: 'Lanre Sanni',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Lanre Sanni — CTO & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lanre Sanni — CTO & AI Engineer',
    description: 'Building scalable systems, AI agents, and engineering teams.',
    creator: '@lanrecodes',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
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
