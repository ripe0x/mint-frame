import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.reservoir.tools",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wrpcd.net",
        pathname: "/cdn-cgi/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' https://cdn.ngrok.com 'unsafe-eval' 'unsafe-inline';
              font-src 'self' https://assets.ngrok.com https://cdn.ngrok.com;
              img-src 'self' data: https://img.reservoir.tools https://imagedelivery.net https://wrpcd.net;
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
            `.replace(/\n/g, ""), // Ensure CSP is a single-line string
          },
        ],
      },
    ];
  },
};

export default nextConfig;
