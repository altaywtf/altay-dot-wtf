'use client'

import { ThemeProvider as ThemeUIThemeProvider } from 'theme-ui'
import { theme } from 'ui/theme'

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeUIThemeProvider theme={theme}>{children}</ThemeUIThemeProvider>
)

export default ThemeProvider
