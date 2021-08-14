import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { Flex, Box, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'

export const getStaticProps: GetStaticProps<{ projects: Project[] }> = () => ({
  props: {
    projects: getProjects(),
  },
})

const ProjectLink: React.FC<{ project: Project }> = ({ project }) => {
  if (project.url.startsWith('/')) {
    return (
      <NextLink href={project.url} passHref>
        <Link variant="links.title">{project.title}</Link>
      </NextLink>
    )
  }

  return (
    <Flex sx={{ alignItems: 'center' }}>
      <Box>
        <Link href={project.url} variant="links.title" target="_blank" rel="noreferrer noopener">
          {project.title}
        </Link>
      </Box>

      <Text sx={{ fontSize: [1, 2], height: [18, 20] }} color="linkPrimary">
        <CgArrowTopRight />
      </Text>
    </Flex>
  )
}

const ProjectsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => (
  <>
    <PageHeader {...projectsCopy} />

    <Box m={4} />

    {projects.map((p) => (
      <Box key={p.title}>
        <ProjectLink project={p} />
        <Box m={1} />
        <Text>{p.description}</Text>
        <Box m={4} />
      </Box>
    ))}
  </>
)

export default ProjectsPage
