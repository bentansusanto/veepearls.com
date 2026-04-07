/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    output: "standalone",
    devIndicators: {
      buildActivity: false,
      appIsrStatus: false,
      staticIndication: false,
    },
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
