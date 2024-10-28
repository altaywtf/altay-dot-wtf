import { booksCopy, homeCopy, postsCopy } from '@/config'
import { readMarkdownFile } from '@/lib/utils/md'
import Markdown from '@/ui/Markdown'
import Image from 'next/image'
import Link from 'next/link'

type Project = {
  description: string
  icon_url: string
  title: string
  url: string
}

const COLLECTIONS: Array<Omit<Project, 'icon_url'>> = [
  {
    description: postsCopy.description,
    title: postsCopy.title,
    url: '/posts',
  },
  {
    description: booksCopy.description,
    title: booksCopy.title,
    url: '/books',
  },
]

const HomePage = () => (
  <>
    <div className="relative h-24 w-24 overflow-hidden rounded border border-solid border-neutral-900">
      <Image alt="That's my head" fill sizes="100%" src="/images/2020-aa.png" />
    </div>

    <div className="mt-8 flex flex-col gap-4">
      <h1>{homeCopy.title}</h1>

      <div className="-mb-2 prose-p:mb-3 prose-p:mt-0">
        <Markdown>{readMarkdownFile('home.md')}</Markdown>
      </div>
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
        href="mailto:altay@hey.com"
      >
        altay@hey.com
      </a>
    </div>
  </>
)

export default HomePage
