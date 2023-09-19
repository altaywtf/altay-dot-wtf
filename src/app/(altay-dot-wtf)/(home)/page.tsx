import { homeCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import Page from 'ui/Page'
import Markdown from 'ui/Markdown'

type Project = {
  title: string
  description: string
  url: string
}

const PROJECTS: Project[] = [
  {
    title: 'Book notes',
    description: 'Taking somewhat detailed notes on books I read.',
    url: '/books',
  },
]

const HomePage = async () => (
  <Page header={{ title: homeCopy.title }}>
    <Markdown>{readMarkdownFile('home.md')}</Markdown>

    <h2>Projects</h2>

    <ul>
      {PROJECTS.map((project) => (
        <li key={project.title}>{project.title}</li>
      ))}
    </ul>
  </Page>
)

export default HomePage
