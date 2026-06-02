/** @type {import('next').NextConfig} */
const ADMIN_TARGET = process.env.WA_GATEWAY_URL || "http://127.0.0.1:8088";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // CSP — allow inline styles (needed for Tailwind/style props),
  // restrict scripts to self + analytics providers.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://plausible.io https://*.plausible.io https://www.googletagmanager.com https://static.cloudflareinsights.com https://app.midtrans.com https://app.sandbox.midtrans.com",
      "connect-src 'self' ws: wss: https://plausible.io https://*.plausible.io https://www.google-analytics.com https://static.cloudflareinsights.com https://api.midtrans.com https://api.sandbox.midtrans.com https://app.midtrans.com https://app.sandbox.midtrans.com",
      "frame-src 'self' https://app.midtrans.com https://app.sandbox.midtrans.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "central-batam-prod.s3.ap-southeast-1.amazonaws.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/socket.io/:path*", destination: `${ADMIN_TARGET}/socket.io/:path*` },
      { source: "/gateway", destination: `${ADMIN_TARGET}/` },
      { source: "/gateway/:path*", destination: `${ADMIN_TARGET}/:path*` },
      { source: "/api/wa/:path*", destination: `${ADMIN_TARGET}/api/:path*` },
    ];
  },
};
export default nextConfig;
