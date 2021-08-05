import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getProjects, Project } from 'api/projects'
import { projectsCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { Box, Link, Text } from 'rebass'

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
        <Link href={p.url} variant="linkTitle" target="_blank">
          {p.title}
        </Link>

        <Box m={1} />

        <Text>{p.description}</Text>

        <Box m={4} />
      </Box>
    ))}
  </>
)

export default ProjectsPage
