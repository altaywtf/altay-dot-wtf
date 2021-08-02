import { LAYOUT_WIDTH } from 'theme'
import { Box } from 'rebass'
import Header from './Header'

const Layout: React.FC = ({ children }) => (
  <Box width={LAYOUT_WIDTH} maxWidth="100%" marginX="auto" paddingX={[2, 2, 0]}>
    <Header />
    <Box m={6} mt={[6, 6, 7]} />
    {children}
    <Box m={6} />
  </Box>
)

export default Layout
