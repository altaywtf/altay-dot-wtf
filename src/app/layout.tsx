import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import 'ui/theme/style.css'
import { gtAmerica } from 'ui/theme/fonts'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" className={`${gtAmerica.variable} dark`}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="rgb(10, 10, 10)" />
      <meta name="msapplication-TileColor" content="rgb(10, 10, 10)" />
    </head>

    <body>
      {children}
      <AnalyticsWrapper />
    </body>
  </html>
)

export default RootLayout
