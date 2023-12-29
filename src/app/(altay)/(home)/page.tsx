import { booksCopy, homeCopy, postsCopy } from '@/config'
import { readMarkdownFile } from '@/lib/utils/md'
import Markdown from '@/ui/Markdown'
import { Github, MoveUpRight, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Project = {
  description: string
  icon_url: string
  title: string
  url: string
}

const EXTERNAL_LINKS = [
  {
    icon: <Github />,
    label: 'GitHub',
    url: 'https://github.com/altaywtf',
  },
  {
    icon: <Twitter />,
    label: 'Twitter',
    url: 'https://x.com/altaywtf',
  },
]

const PROJECTS: Project[] = [
  {
    description: 'Your hard-working AI podcast companion.',
    icon_url: '/images/projects/beecast.png',
    title: 'beecast',
    url: 'https://github.com/experiment-station/beecast',
  },
  {
    description:
      'Privacy-centric, data-driven browser coverage tool for your web projects.',
    icon_url: '/images/projects/browsercare.png',
    title: 'browsercare',
    url: 'https://github.com/experiment-station/browsercare',
  },
  {
    description: 'Raycast extension for putio.',
    icon_url: '/images/projects/raycast.png',
    title: 'put.io Raycast',
    url: 'https://github.com/putdotio/putio-raycast',
  },
  {
    description: 'Web client for Accept NANO payment gateway.',
    icon_url: '/images/projects/accept-nano.png',
    title: 'Accept Nano',
    url: 'https://github.com/accept-nano/accept-nano-client',
  },
]

const COLLECTIONS: Array<Omit<Project, 'icon_url'>> = [
  {
    description: booksCopy.description,
    title: booksCopy.title,
    url: '/books',
  },
  {
    description: postsCopy.description,
    title: postsCopy.title,
    url: '/posts',
  },
]

const HomePage = () => (
  <>
    <div className="relative h-28 w-28 overflow-hidden rounded border border-solid border-neutral-900">
      <Image alt="That's my head" fill sizes="100%" src="/images/avatar.png" />
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
          className="flex flex-row items-center gap-1.5 rounded border border-solid border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm hover:bg-neutral-800"
          href={item.url}
          key={item.url}
          rel="noopener noreferrer"
          target="_blank"
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
              <Image alt={item.title} fill sizes="100%" src={item.icon_url} />
            </div>

            <div className="flex flex-1 flex-col">
              <a
                className="flex flex-row items-center gap-0.5 self-start font-medium text-amber-400 hover:text-amber-200"
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{item.title}</span>
                <MoveUpRight className="text-xs" />
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
                className="self-start font-medium text-amber-400 hover:text-amber-200"
                href={item.url}
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

    <div className="text-sm text-neutral-400">
      <a
        className="hover:text-neutral-300 hover:underline"
        href="mailto:altay@zebrastik.com"
      >
        altay@zebrastik.com
      </a>
    </div>
  </>
)

export default HomePage
