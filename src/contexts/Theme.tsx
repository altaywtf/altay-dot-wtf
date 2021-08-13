import { ThemeProvider as ThemeUIThemeProvider } from 'theme-ui'
// import useDarkMode from 'use-dark-mode'
import { theme } from 'theme'
// import { createGlobalStyles } from 'theme/styles/global'

export const ThemeProvider: React.FC = ({ children }) => {
  // const { value: dark } = useDarkMode()
  return <ThemeUIThemeProvider theme={theme}>{children}</ThemeUIThemeProvider>
}
