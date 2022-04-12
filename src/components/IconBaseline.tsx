import { Box, ThemeUICSSObject } from 'theme-ui'

const IconBaseline: React.FC<{ sx?: ThemeUICSSObject }> = ({ children, sx = {} }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      svg: {
        top: '.15em',
        left: '.125em',
        right: '.125em',
        position: 'relative',
      },
      lineHeight: 1,
      ...sx,
    }}
  >
    {children}
  </Box>
)

export default IconBaseline
