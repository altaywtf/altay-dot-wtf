'use client'

import { theme } from 'theme'
import { ThemeProvider as ThemeUIThemeProvider } from 'theme-ui'

const ThemeProvider: React.FC = ({ children }) => (
  <ThemeUIThemeProvider theme={theme}>{children}</ThemeUIThemeProvider>
)

export default ThemeProvider
