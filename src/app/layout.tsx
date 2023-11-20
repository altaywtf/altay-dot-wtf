import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import 'ui/theme/style.css'
import { gtAmerica, gtAmericaMono } from 'ui/theme/fonts'
import { Metadata } from 'next'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { PathHistoryListener } from 'ui/PathHistoryListener'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: getOpenGraphImage({
      type: 'page',
      title: SITE_DESCRIPTION,
    }),
  },
} as const

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" className={`${gtAmerica.variable} ${gtAmericaMono.variable} dark`}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="theme-color" content="rgb(10, 10, 10)" />
      <meta name="msapplication-TileColor" content="rgb(10, 10, 10)" />
    </head>

    <body>
      <main className="p-safe">
        <section className="app-width px-4 py-8 sm:px-0">{children}</section>
      </main>
      <PathHistoryListener />
      <AnalyticsWrapper />
    </body>
  </html>
)

export default RootLayout
