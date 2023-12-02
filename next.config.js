// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  redirects: async () => [
    // `zebrastik.com` to `zebrastik`
    {
      destination: '/zebrastik',
      has: [{ type: 'host', value: 'zebrastik.com' }],
      permanent: true,
      source: '/',
    },
    {
      destination: '/zebrastik',
      has: [{ type: 'host', value: 'zbrstk.com' }],
      permanent: true,
      source: '/',
    },

    // deleted pages
    {
      destination: '/',
      permanent: true,
      source: '/now',
    },

    // `articles`, `notes`, and `blog` to `posts`
    {
      destination: '/blog',
      permanent: true,
      source: '/articles',
    },
    {
      destination: '/posts/:path*',
      permanent: true,
      source: '/articles/:path*',
    },
    {
      destination: '/images/posts/:path*',
      permanent: true,
      source: '/images/articles/:path*',
    },
    {
      destination: '/blog',
      permanent: true,
      source: '/notes',
    },
    {
      destination: '/posts/:path*',
      permanent: true,
      source: '/notes/:path*',
    },
    {
      destination: '/images/posts/:path*',
      permanent: true,
      source: '/images/notes/:path*',
    },
    {
      destination: '/posts',
      permanent: true,
      source: '/blog',
    },
    {
      destination: '/posts/:path*',
      permanent: true,
      source: '/blog/:path*',
    },
    {
      destination: '/images/posts/:path*',
      permanent: true,
      source: '/images/blog/:path*',
    },
  ],
}

module.exports = nextConfig
