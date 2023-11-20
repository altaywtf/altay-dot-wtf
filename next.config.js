// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },

  redirects: async () => [
    // deleted pages
    {
      source: '/now',
      destination: '/',
      permanent: true,
    },
    {
      source: '/zebrastik',
      destination: '/',
      permanent: true,
    },

    // `articles`, `notes`, and `blog` to `posts`
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
