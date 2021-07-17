import { projectsCopy } from 'config/copy'
import NextLink from 'next/link'
import PageHeader from 'components/PageHeader'
import { Box, Link, Heading, Text } from 'rebass'
import { CgArrowRight, CgArrowTopRight } from 'react-icons/cg'
import projects from 'config/projects.json'

const ProjectsPage: React.FC = () => (
  <>
    <PageHeader {...projectsCopy} />
    <Box m={4} />
    {projects.map((p) => (
      <Box key={p.name} mb={4}>
        <NextLink href={p.url} passHref>
          <Link {...(p.url.startsWith('/') ? {} : { target: '_blank' })}>
            <Heading as="h3" fontSize={2} sx={{ display: 'inline-flex', alignItems: 'center' }}>
              {p.name}
              <Box ml={1} />
              {p.url.startsWith('/') ? <CgArrowRight /> : <CgArrowTopRight />}
            </Heading>
          </Link>
        </NextLink>

        <Box my={1} />

        <Text>{p.details}</Text>
      </Box>
    ))}
  </>
)

export default ProjectsPage
