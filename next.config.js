/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using server mode for Netlify deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
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
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { timeout: 60000 }, // Increased timeout to 60 seconds
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
  // Required for Netlify
  trailingSlash: false,
};

module.exports = nextConfig;