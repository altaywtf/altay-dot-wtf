import { homeCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import Page from 'ui/Page'
import Markdown from 'ui/Markdown'
import Link from 'next/link'

type Project = {
  title: string
  description: string
  url: string
}

const PROJECTS: Project[] = [
  {
    title: 'put.io Raycast',
    description: 'A Raycast extension for put.io.',
    url: 'https://github.com/putdotio/putio-raycast',
  },
  {
    title: 'Book notes',
    description: 'Somewhat detailed notes from books I read.',
    url: '/books',
  },
  {
    title: 'Accept Nano',
    description: 'JavaScript client for Accept NANO payment gateway.',
    url: 'https://github.com/accept-nano/accept-nano-client',
  },
]

const HomePage = async () => {
  return (
    <Page header={{ title: homeCopy.title }}>
      <Markdown>{readMarkdownFile('home.md')}</Markdown>

      <hr />

      <h2>Recent projects</h2>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <div key={project.title} className="flex flex-col gap-1">
            <div>
              {project.url.startsWith('/') ? (
                <Link
                  href={project.url as any}
                  className="font-medium text-amber-400 hover:text-amber-200"
                >
                  {project.title}
                </Link>
              ) : (
                <a
                  href={project.url}
                  target="_blank"
                  className="font-medium text-amber-400 hover:text-amber-200"
                >
                  {project.title}
                </a>
              )}
            </div>

            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default HomePage
