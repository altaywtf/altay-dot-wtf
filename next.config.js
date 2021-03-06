// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/articles/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/notes',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
      {
        source: '/posts/:path*',
        destination: '/notes/:path*',
        permanent: true,
      },
    ]
  },
})
