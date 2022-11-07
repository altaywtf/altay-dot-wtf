import AnalyticsWrapper from 'components/AnalyticsWrapper'
import ThemeProvider from 'components/ThemeProvider'
import '../theme/style.css'
import RootStyleRegistry from './emotion'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <RootStyleRegistry>
        <ThemeProvider>{children}</ThemeProvider>
        <AnalyticsWrapper />
      </RootStyleRegistry>
    </body>
  </html>
)

export default RootLayout
