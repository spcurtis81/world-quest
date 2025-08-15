import type { NextConfig } from 'next';

const basePath = process.env.BASE_PATH && process.env.BASE_PATH !== '/' ? process.env.BASE_PATH : undefined;

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@world-quest/ui'],
    externalDir: true
  },
  transpilePackages: ['@world-quest/ui'],
  output: 'standalone',
  basePath,
};

export default config;
