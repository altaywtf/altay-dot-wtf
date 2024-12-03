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
  redirects: async () => [
    {
      destination: "/resume",
      permanent: true,
      source: "/cv",
    },
  ],
};

module.exports = nextConfig;
