import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
       {
        protocol: "https",
        hostname: "static.naukimg.com",
      },
      {
        protocol: "https",
        hostname: "3fdk4hlq2q.ufs.sh",
      },
      {
        protocol : "https",
        hostname : "lh3.googleusercontent.com"
      }
    ],
  },
};

export default nextConfig;
