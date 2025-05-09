/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing 'output: export' to support dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'syuddulwqqyuhrcwhqqs.supabase.co',
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Disable cache in development to prevent cache corruption issues
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;