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
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add this line
        pathname: "/**", // Match all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "f8n-production.imgix.net", // Add this line
        pathname: "/**", // Match all paths under this hostname
      },
      {
        protocol: "https",
        hostname: "7425-2600-1700-6031-7010-bc06-7ede-80f8-fca8.ngrok-free.app", // Add this line
        pathname: "/**", // Match all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
