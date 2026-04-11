import type { NextConfig } from "next";

// CSP only in production — blocks Next.js HMR websocket in dev
const cspPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://accounts.google.com https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://accounts.google.com",
  "font-src 'self'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://c.bing.com https://c.clarity.ms https://lh3.googleusercontent.com",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.clarity.ms https://accounts.google.com",
  "frame-src https://accounts.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ];
    if (process.env.NODE_ENV === 'production') {
      securityHeaders.push({ key: 'Content-Security-Policy', value: cspPolicy });
    }
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
