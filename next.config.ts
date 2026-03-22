import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      { pathname: '/profile/**' },
      { pathname: '/speaking/**' },
      { pathname: '/projects/**' },
    ],
  },
};

export default nextConfig;
