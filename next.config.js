// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      },
    ];
  },

  reactStrictMode: true,

  redirects: async () => [
    {
      destination: "/",
      permanent: true,
      source: "/now",
    },

    {
      destination: "/resume",
      permanent: true,
      source: "/cv",
    },

    {
      destination: "/blog",
      permanent: true,
      source: "/articles",
    },
    {
      destination: "/posts/:path*",
      permanent: true,
      source: "/articles/:path*",
    },
    {
      destination: "/images/posts/:path*",
      permanent: true,
      source: "/images/articles/:path*",
    },
    {
      destination: "/blog",
      permanent: true,
      source: "/notes",
    },
    {
      destination: "/posts/:path*",
      permanent: true,
      source: "/notes/:path*",
    },
    {
      destination: "/images/posts/:path*",
      permanent: true,
      source: "/images/notes/:path*",
    },
    {
      destination: "/posts",
      permanent: true,
      source: "/blog",
    },
    {
      destination: "/posts/:path*",
      permanent: true,
      source: "/blog/:path*",
    },
    {
      destination: "/images/posts/:path*",
      permanent: true,
      source: "/images/blog/:path*",
    },
  ],
};

module.exports = nextConfig;
