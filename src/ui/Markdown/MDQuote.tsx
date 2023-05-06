import { Box, Text } from 'theme-ui'

const MDQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'backgroundSecondary',
      borderLeftWidth: 2,
      borderLeftColor: 'textSecondary',
      borderLeftStyle: 'solid',
      paddingY: 2,
      paddingX: 4,
    }}
    marginY={[1, 2, 3]}
  >
    <Text>{children}</Text>
  </Box>
)

export default MDQuote
