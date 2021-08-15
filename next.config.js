// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
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
        source: '/analytics',
        destination: '/analytics.html',
        permanent: true,
      },
    ]
  },
})
