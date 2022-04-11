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

      <Text sx={{ flexShrink: 0, lineHeight: 1 }}>
        <CgArrowTopRight />
      </Text>
    </Flex>
  )
}

const ProjectsPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => (
  <Page header={projectsCopy}>
    {projects.map((p) => (
      <Box key={p.title} mb={4}>
        <Box>
          <ProjectLink project={p} />
        </Box>

        <Text>{p.description}</Text>
      </Box>
    ))}
  </Page>
)

export default ProjectsPage
