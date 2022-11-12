/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  rewrites: async () => ({
    afterFiles: [
      {
        source: '/',
        destination: '/zebrastik',
        has: [{ type: 'host', value: 'www.zebrastik.com' }],
      },
    ],
  }),

  redirects: async () => [
    {
      source: '/zebrastik',
      destination: '/',
    },
    {
      source: '/articles',
      destination: '/posts',
      permanent: true,
    },
    {
      source: '/articles/:path*',
      destination: '/posts/:path*',
      permanent: true,
    },
    {
      source: '/images/articles/:path*',
      destination: '/images/posts/:path*',
      permanent: true,
    },
    {
      source: '/notes',
      destination: '/posts',
      permanent: true,
    },
    {
      source: '/notes/:path*',
      destination: '/posts/:path*',
      permanent: true,
    },
    {
      source: '/images/notes/:path*',
      destination: '/images/posts/:path*',
      permanent: true,
    },
    {
      source: '/blog',
      destination: '/posts',
      permanent: true,
    },
    {
      source: '/blog/:path*',
      destination: '/posts/:path*',
      permanent: true,
    },
    {
      source: '/images/blog/:path*',
      destination: '/images/posts/:path*',
      permanent: true,
    },
  ],
}

module.exports = nextConfig
