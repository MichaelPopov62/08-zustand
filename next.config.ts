/*Файл конфігурації Next.js (next.config.ts) задає налаштування проєкту, зокрема для обробки зображень.*/

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ac.goit.global' }],
  },
};

export default nextConfig;
