import { PropsWithChildren } from 'react'
import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import { gtAmerica, gtAmericaMono } from 'ui/theme/fonts'
import 'ui/theme/style.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <html className={`${gtAmerica.variable} ${gtAmericaMono.variable} dark`} lang="en">
    <head>
      <meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport" />
      <meta content="rgb(10, 10, 10)" name="theme-color" />
      <meta content="rgb(10, 10, 10)" name="msapplication-TileColor" />
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
