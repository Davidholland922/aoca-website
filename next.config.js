/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Assets are pre-sized (max 1600px) at build time; serving them directly
    // keeps the Vercel free-tier image-optimization quota untouched.
    unoptimized: true,
  },
};

module.exports = nextConfig;
