import '../theme/style.css'
import RootStyleRegistry from './emotion'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body>
      <RootStyleRegistry>{children}</RootStyleRegistry>
    </body>
  </html>
)

export default RootLayout
