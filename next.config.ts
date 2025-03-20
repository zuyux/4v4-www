import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scarlet-charming-caterpillar-527.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**', 
      },
    ],
  },
};

export default nextConfig;
