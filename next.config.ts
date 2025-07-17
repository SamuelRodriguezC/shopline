import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      }
    ],
  },


};

export default nextConfig;
