import AnalyticsWrapper from 'ui/AnalyticsWrapper'
import ThemeProvider from 'ui/ThemeProvider'
import ForceClient from 'ui/ForceClient'
import 'ui/theme/style.css'
import RootStyleRegistry from './emotion'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
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
