import { homeCopy } from 'config/copy'
import { Box, Text, Link } from 'rebass'
import NextLink from 'next/link'
import { CgArrowRight } from 'react-icons/cg'
import PageHeader from 'components/PageHeader'

const Home: React.FC = () => (
  <>
    <PageHeader title={homeCopy.title} description={homeCopy.description} />

    <Box m={2} />

    <Box>
      {homeCopy.links.map((link) => (
        <Box key={link.href}>
          <NextLink href={link.href} passHref>
            <Link>
              <Box display="inline-flex" sx={{ alignItems: 'center', fontSize: [0, 1] }}>
                <Text mr={1}>{link.label}</Text>
                <CgArrowRight />
              </Box>
            </Link>
          </NextLink>

          <Box m={1} />
        </Box>
      ))}
    </Box>
  </>
)

export default Home
