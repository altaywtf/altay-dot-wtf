// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  redirects: async () => [
    {
      source: '/',
      destination: '/zebrastik',
      permanent: true,
      has: [{ type: 'host', value: 'zebrastik.com' }],
    },
    {
      source: '/',
      destination: '/zebrastik',
      permanent: true,
      has: [{ type: 'host', value: 'zbrstk.com' }],
    },
    {
      source: '/now',
      destination: '/',
      permanent: true,
    },
    {
      source: '/articles',
      destination: '/blog',
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
      destination: '/blog',
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
