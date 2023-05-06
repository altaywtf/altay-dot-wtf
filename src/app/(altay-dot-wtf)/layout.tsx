'use client'

import { Box } from 'theme-ui'
import { LAYOUT_WIDTH } from 'ui/theme'
import { usePathHistoryListener } from 'hooks/usePathHistory'
import Header from 'components/Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePathHistoryListener()

  return (
    <>
      <Header />

      <Box
        sx={{
          width: LAYOUT_WIDTH,
          maxWidth: '100%',
          marginX: 'auto',
          paddingX: [3, 3, 0],
        }}
      >
        <Box my={[3, 3, 4]}>{children}</Box>
      </Box>
    </>
  )
}

export default Layout
