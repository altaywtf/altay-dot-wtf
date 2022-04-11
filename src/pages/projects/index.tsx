import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import Page from 'components/Page'
import { Flex, Box, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'

export const getStaticProps: GetStaticProps<{ projects: Project[] }> = () => ({
  props: { projects: getProjects() },
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
    <Flex sx={{ alignItems: 'center', color: 'link', gap: 1 }}>
      <Link variant="links.title" href={project.url} target="_blank" rel="noreferrer noopener">
        {project.title}
      </Link>

      <CgArrowTopRight />
    </Flex>
  )
}

const ProjectsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => (
  <Page header={projectsCopy}>
    {projects.map((p) => (
      <Box key={p.title}>
        <ProjectLink project={p} />
        <Box my={1} />
        <Text>{p.description}</Text>
        <Box my={4} />
      </Box>
    ))}
  </Page>
)

export default ProjectsPage
