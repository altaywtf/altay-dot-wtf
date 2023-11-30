import { homeCopy, booksCopy, postsCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import Markdown from 'ui/Markdown'
import Image from 'next/image'
import { VscGithub } from 'react-icons/vsc'
import { FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { CgArrowTopRight } from 'react-icons/cg'
import Link from 'next/link'

type Project = {
  title: string
  description: string
  url: string
  icon_url: string
}

const EXTERNAL_LINKS = [
  {
    label: 'GitHub',
    url: 'https://github.com/altaywtf',
    icon: <VscGithub />,
  },
  {
    label: 'X.com',
    url: 'https://x.com/altaywtf',
    icon: <FaXTwitter />,
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/altaywtf/',
    icon: <FaLinkedin />,
  },
]

const PROJECTS: Project[] = [
  {
    title: 'browsercare',
    description:
      'A tool for making data-driven decisions to adjust browser coverage of web projects.',
    url: 'https://github.com/experiment-station/browsercare',
    icon_url: '/images/projects/browsercare.png',
  },
  {
    title: 'put.io Raycast',
    description: 'A Raycast extension for putio.',
    url: 'https://github.com/putdotio/putio-raycast',
    icon_url: '/images/projects/raycast.png',
  },
  {
    title: 'Accept Nano',
    description: 'JavaScript client for Accept NANO payment gateway.',
    url: 'https://github.com/accept-nano/accept-nano-client',
    icon_url: '/images/projects/accept-nano.png',
  },
]

const COLLECTIONS: Array<Omit<Project, 'icon_url'>> = [
  {
    title: postsCopy.title,
    description: postsCopy.description,
    url: '/posts',
  },
  {
    title: booksCopy.title,
    description: booksCopy.description,
    url: '/books',
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
      {EXTERNAL_LINKS.map((item) => (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1.5 rounded border border-solid border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </div>

    <hr className="my-8" />

    <h2>Open-source projects</h2>

    <div className="mt-4 flex flex-col gap-6">
      {PROJECTS.map((item) => (
        <div key={item.title}>
          <div className="flex flex-row items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded border border-solid border-neutral-900">
              <Image src={item.icon_url} alt={item.title} fill sizes="100%" />
            </div>

            <div className="flex flex-1 flex-col">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-0.5 self-start font-medium text-amber-400 hover:text-amber-200"
              >
                <span>{item.title}</span>

                <span className="text-sm">
                  <CgArrowTopRight />
                </span>
              </a>

              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <hr className="my-8" />

    <div className="mt-4 flex flex-col gap-6">
      {COLLECTIONS.map((item) => (
        <div key={item.title}>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-1 flex-col">
              <Link
                href={item.url}
                className="self-start font-medium text-amber-400 hover:text-amber-200"
              >
                {item.title}
              </Link>

              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <hr className="my-8" />

    <div className="text-neutral-400">
      <a className="hover:text-neutral-300" href="mailto:altay@zebrastik.com">
        altay@zebrastik.com
      </a>
    </div>
  </>
)

export default HomePage
