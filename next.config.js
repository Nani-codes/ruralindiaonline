/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: [
      "en",
      "hi",
      "te",
      "mr",
      "gu",
      "bn",
      "kn",
      "pa",
      "as",
      "ml",
      "ur",
      "ta",
      "or",
      "hne",
      "bho"
    ],
    defaultLocale: "en",
  },
  images: {
    domains: ["beta.ruralindiaonline.org"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    //largePageDataBytes: 128 * 1000, // 128KB by default
    largePageDataBytes: 128 * 1000000,
  },
};

module.exports = nextConfig;
