import { NextSeo } from 'next-seo'
import { SEO } from 'config'

const Head: React.FC = () => (
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#101010" />
    <link rel="apple-touch-icon" sizes="57x57" href="/favicon/favicon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/favicon/favicon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/favicon/favicon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/favicon/favicon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/favicon/favicon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/favicon/favicon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/favicon/favicon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/favicon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180x180.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/favicon-192x192.png" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico" />
    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
    <meta name="msapplication-TileColor" content="#101010" />
    <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
    <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

    <NextSeo useAppDir {...SEO} />
  </head>
)

export default Head
