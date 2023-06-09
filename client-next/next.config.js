/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  rewrites: async () => [
    {
      source: '/login',
      destination: '/auth/login',
    },
    {
      source: '/register',
      destination: '/auth/register',
    },
  ],
  // TODO configure /forgot-password route to get file from /auth/forgot-password
  // TODO configure /reset-password route to get file from /auth/reset-password

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
