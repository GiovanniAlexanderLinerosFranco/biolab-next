import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Attachment uploads go through server actions (max file 10 MB + form overhead).
  experimental: { serverActions: { bodySizeLimit: "11mb" } },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
