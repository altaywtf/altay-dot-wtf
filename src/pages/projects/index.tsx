import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import NextLink from 'next/link'
import PageHeader from 'components/PageHeader'
import { Box, Link, Heading, Text } from 'rebass'
import { CgArrowRight, CgArrowTopRight } from 'react-icons/cg'

export const getStaticProps: GetStaticProps<{ projects: Project[] }> = () => ({
  props: {
    projects: getProjects(),
  },
})

const ProjectsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => (
  <>
    <PageHeader {...projectsCopy} />

    <Box m={4} />

    {projects.map((p) => (
      <Box key={p.title}>
        <NextLink href={p.url} passHref>
          <Link {...(p.url.startsWith('/') ? {} : { target: '_blank' })}>
            <Heading
              as="h3"
              fontSize={[1, 2]}
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              {p.title}
              <Box ml={1} />
              {p.url.startsWith('/') ? <CgArrowRight /> : <CgArrowTopRight />}
            </Heading>
          </Link>
        </NextLink>

        <Box m={1} />

        <Text fontSize={0}>{p.description}</Text>

        <Box m={4} />
      </Box>
    ))}
  </>
)

export default ProjectsPage
