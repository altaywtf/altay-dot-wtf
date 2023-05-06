import AnalyticsWrapper from 'components/AnalyticsWrapper'
import ThemeProvider from 'components/ThemeProvider'
import ForceClient from 'components/ForceClient'
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
