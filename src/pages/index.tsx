import { homeCopy } from 'config/copy'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import HomeLink from 'components/Home/HomeLink'

const Home: React.FC = () => (
  <>
    <PageHeader title={homeCopy.title} description={homeCopy.description} />

    <Box my={2}>
      {homeCopy.links.map((link) => (
        <HomeLink key={link.href} {...link} />
      ))}
    </Box>
  </>
)

export default Home
