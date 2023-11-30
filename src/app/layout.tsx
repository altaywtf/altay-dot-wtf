import { PropsWithChildren } from 'react'
import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import { gtAmerica, gtAmericaMono } from 'ui/theme/fonts'
import 'ui/theme/style.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
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

      <AnalyticsWrapper />
    </body>
  </html>
)

export default Layout
