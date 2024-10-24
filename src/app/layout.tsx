import { APP_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/config'
import { getOpenGraphImage } from '@/lib/utils/openGraph'
import AnalyticsWrapper from '@/ui/AnalyticsWrapper'
import { PathHistoryListener } from '@/ui/PathHistoryListener'
import { gtAmerica, gtAmericaMono } from '@/ui/theme/fonts'
import '@/ui/theme/style.css'
import '@/ui/theme/style.css'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    description: SITE_DESCRIPTION,
    images: getOpenGraphImage({
      title: SITE_DESCRIPTION,
      type: 'page',
    }),
    title: SITE_TITLE,
    url: SITE_URL,
  },
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
} as const

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <html
    className={`${gtAmerica.variable} ${gtAmericaMono.variable} dark`}
    lang="en"
  >
    <head>
      <meta
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        name="viewport"
      />
      <meta content="rgb(10, 10, 10)" name="theme-color" />
      <meta content="rgb(10, 10, 10)" name="msapplication-TileColor" />
    </head>

    <body>
      <main className="p-safe">
        <section className="app-width px-4 py-8 sm:px-0">{children}</section>
      </main>

      <AnalyticsWrapper />
      <PathHistoryListener />
    </body>
  </html>
)

export default Layout
