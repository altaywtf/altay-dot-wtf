import { homeCopy, booksCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import Markdown from 'ui/Markdown'
import Link from 'next/link'
import Image from 'next/image'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithub } from '@react-icons/all-files/vsc/VscGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'

type Project = {
  title: string
  description: string
  url: string
  icon_url: string
}

const PROJECTS: Project[] = [
  {
    title: 'put.io Raycast',
    description: 'A Raycast extension for putio.',
    url: 'https://github.com/putdotio/putio-raycast',
    icon_url: '/images/projects/raycast.png',
  },
  {
    title: booksCopy.title,
    description: booksCopy.description,
    url: '/books',
    icon_url: '/images/books/navalmanack/cover.png',
  },
  {
    title: 'Accept Nano',
    description: 'JavaScript client for Accept NANO payment gateway.',
    url: 'https://github.com/accept-nano/accept-nano-client',
    icon_url: '/images/projects/accept-nano.png',
  },
]

type Link = {
  title: string
  url: string
  icon: React.ReactNode
}

const LINKS: Link[] = [
  {
    title: 'GitHub',
    url: 'https://github.com/altaywtf',
    icon: <VscGithub />,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/altaywtf',
    icon: <VscTwitter />,
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/altaywtf/',
    icon: <FaLinkedin />,
  },
]

const HomePage = async () => (
  <>
    <div className="relative h-28 w-28 overflow-hidden rounded border border-solid border-neutral-900">
      <Image src="/images/avatar.png" alt="That's my head" fill sizes="100%" />
    </div>

    <div className="mt-8 flex flex-col gap-4">
      <h1>{homeCopy.title}</h1>

      <div className="-mb-2 prose-p:mb-3 prose-p:mt-0">
        <Markdown>{readMarkdownFile('home.md')}</Markdown>
      </div>
    </div>

    <div className="mt-4 flex flex-row gap-2">
      {LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1.5 rounded border border-solid border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
        >
          <span>{link.icon}</span>
          <span>{link.title}</span>
        </a>
      ))}
    </div>

    <hr className="my-8" />

    <h2>Recent projects</h2>

    <div className="mt-4 flex flex-col gap-6">
      {PROJECTS.map((project) => (
        <div key={project.title}>
          <div className="flex flex-row items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded">
              <Image src={project.icon_url} alt={project.title} fill sizes="100%" />
            </div>

            <div className="flex flex-1 flex-col">
              <div>
                {project.url.startsWith('/') ? (
                  <Link
                    href={project.url}
                    className="font-medium text-amber-400 hover:text-amber-200"
                  >
                    {project.title}
                  </Link>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    className="font-medium text-amber-400 hover:text-amber-200"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                )}
              </div>

              <p>{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <hr className="my-8" />

    <a
      className="font-mono text-sm text-neutral-400 hover:text-neutral-300"
      href="mailto:altay@zebrastik.com"
    >
      altay@zebrastik.com
    </a>
  </>
)

export default HomePage
