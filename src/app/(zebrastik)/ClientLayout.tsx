'use client'

import { Box } from 'theme-ui'
import { LAYOUT_WIDTH } from 'ui/theme'

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
)

export default ClientLayout
