import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ... any other config you have
  
  // 1. REMOVE the 'experimental' block I gave you before.

  // 2. Add 'allowedDevOrigins' directly to the root of the config:
  // @ts-ignore - This property is valid, but your @types/next package might be outdated
  allowedDevOrigins: [
    "http://10.201.66.41:3000", // Your phone's IP
    "http://localhost:3000",       // Your computer
  ],

};

export default nextConfig;