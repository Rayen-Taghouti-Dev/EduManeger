import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@edumanager/ui', '@edumanager/types'],
};

export default nextConfig;
