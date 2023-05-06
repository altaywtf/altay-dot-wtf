import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import ThemeProvider from 'ui/ThemeProvider'
import ForceClient from 'ui/ForceClient'
import 'ui/theme/style.css'
import RootStyleRegistry from './emotion'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#101010" />
      <meta name="msapplication-TileColor" content="#101010" />
    </head>

    <body>
      <RootStyleRegistry>
        <ThemeProvider>
          <ForceClient>{children}</ForceClient>
        </ThemeProvider>
        <AnalyticsWrapper />
      </RootStyleRegistry>
    </body>
  </html>
)

export default RootLayout
