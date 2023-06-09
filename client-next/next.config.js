/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  // TODO configure nextConfig: /login route to get file from /auth/login
  // TODO configure /register route to get file from /auth/register
  // TODO configure /forgot-password route to get file from /auth/forgot-password
  // TODO configure /reset-password route to get file from /auth/reset-password
  // TODO configure /verify-email route to get file from /auth/verify-email
  // TODO configure /verify-request route to get file from /auth/verify-request

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
