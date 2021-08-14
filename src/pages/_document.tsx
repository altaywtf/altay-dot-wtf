import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/please-dont-download-these-fonts-buy-a-license-instead-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/please-dont-download-these-fonts-buy-a-license-instead-Regular-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/please-dont-download-these-fonts-buy-a-license-instead-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/please-dont-download-these-fonts-buy-a-license-instead-Bold-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
