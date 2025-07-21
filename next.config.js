/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "standalone",
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        }
      ],
    },
  };
  module.exports = nextConfig;
    