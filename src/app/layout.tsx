import '../theme/style.css'
import AnalyticsWrapper from 'components/Analytics'
import RootStyleRegistry from './emotion'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <RootStyleRegistry>{children}</RootStyleRegistry>
      <AnalyticsWrapper />
    </body>
  </html>
)

export default RootLayout
