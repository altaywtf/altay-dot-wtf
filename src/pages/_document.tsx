import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createTypographyCSS } from 'theme/typography'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style global jsx>{`
            ${createTypographyCSS()}

            ul, ol {
              padding: 0;
              margin: 4px 0 4px 24px;
            }

            li {
              line-height: 1.4;
              margin: 4px 0;
            }
          `}</style>
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
