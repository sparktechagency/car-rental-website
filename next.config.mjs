/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.0.60.110',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asif7001.binarybards.online',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '10.10.7.112',
        port: '7001',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;