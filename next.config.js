/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["occ-0-3933-116.1.nflxso.net", "occ-0-951-2433.1.nflxso.net"],
  },
};

module.exports = nextConfig;