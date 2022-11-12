import AnalyticsWrapper from 'components/AnalyticsWrapper'
import ThemeProvider from 'components/ThemeProvider'
import RootStyleRegistry from './emotion'
import ForceClient from 'components/ForceClient'
import '../theme/style.css'

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
