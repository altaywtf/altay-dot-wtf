import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import Page from 'components/Page'
import { Box, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import { CgArrowTopRight } from '@react-icons/all-files/cg/CgArrowTopRight'
import IconBaseline from 'components/IconBaseline'

export const getStaticProps: GetStaticProps<{ projects: Project[] }> = () => ({
  props: { projects: getProjects() },
})

const ProjectLink: React.FC<{ project: Project }> = ({ project }) => {
  if (project.url.startsWith('/')) {
    return (
      <NextLink href={project.url} passHref legacyBehavior>
        <Link variant="links.title">{project.title}</Link>
      </NextLink>
    )
  }

  return (
    <Link variant="links.title" href={project.url} target="_blank" rel="noreferrer noopener">
      {project.title}

      <IconBaseline>
        <CgArrowTopRight />
      </IconBaseline>
    </Link>
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
