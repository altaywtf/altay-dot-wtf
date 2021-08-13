import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { Flex, Box, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import { GoLinkExternal } from 'react-icons/go'

export const getStaticProps: GetStaticProps<{ projects: Project[] }> = () => ({
  props: {
    projects: getProjects(),
  },
})

const ProjectLink: React.FC<{ project: Project }> = ({ project }) => {
  if (project.url.startsWith('/')) {
    return (
      <NextLink href={project.url} passHref>
        <Link variant="linkTitle">{project.title}</Link>
      </NextLink>
    )
  }

  return (
    <Flex sx={{ alignItems: 'flex-end' }}>
      <Link href={project.url} variant="linkTitle" target="_blank">
        {project.title}
      </Link>

      <Box mr={1} />

      <Text sx={{ fontSize: 0 }} color="linkPrimary">
        <GoLinkExternal />
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
