import { LAYOUT_WIDTH } from 'theme'
import { Box } from 'theme-ui'
import Header from './Header'
import GlobalStyles from './GlobalStyles'

const Layout: React.FC = ({ children }) => (
  <>
    <GlobalStyles />

    <Box
      sx={{
        width: LAYOUT_WIDTH,
        maxWidth: '100%',
        marginX: 'auto',
        paddingX: [2, 2, 0],
      }}
    >
      <Header />
      <Box m={6} mt={[6, 6, 7]} />
      {children}
      <Box m={6} />
    </Box>
  </>
)

export default Layout
