import { LAYOUT_WIDTH } from 'theme'
import { Box } from 'theme-ui'
import Header from './Header'

const Layout: React.FC = ({ children }) => (
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
      <Box my={[3, 4, 5]}>{children}</Box>
    </Box>
  </>
)

export default Layout
