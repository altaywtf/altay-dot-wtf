import { Metadata } from 'next'
import { API_URL, nowCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Image from 'next/image'
import Page from 'ui/Page'
import { formatDate } from 'lib/utils/date'
import type { NowJSON } from 'scripts/now/lib/types'

export const generateMetadata = async (): Promise<Metadata> => ({
  ...nowCopy,
  openGraph: {
    ...nowCopy,
    images: getOpenGraphImage({
      type: 'page',
      title: nowCopy.title,
    }),
  },
})

const fetchData = async () => {
  const res = await fetch(`${API_URL}/now`, { cache: 'no-cache' })
  const { now } = await res.json()
  return now as NowJSON
}

const NowSectionContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-row flex-wrap gap-4">{children}</div>
)

const NowSectionItem: React.FC<{
  alt: string
  title: string
  description?: string
  url: string
  image: {
    type: 'vertical' | 'square'
    alt: string
    src: string
  }
}> = ({ alt, title, description, url, image }) => (
  <a
    key={url}
    href={url}
    title={alt}
    target="_blank"
    rel="noreferrer noopener"
    className="max-w-[160px] transition duration-300 ease-in-out hover:scale-105 sm:max-w-[196px]"
  >
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded bg-neutral-900">
        <div
          className={`relative ${
            image.type === 'vertical'
              ? 'h-[168px] w-[120px] sm:h-[196px] sm:w-[140px]'
              : ' h-[160px] w-[160px] sm:h-[196px] sm:w-[196px]'
          }`}
        >
          <Image alt={image.alt} src={image.src} fill className=" object-cover" />
        </div>
      </div>

      <div className="flex flex-col">
        <p>{title}</p>
        {description ? <p className="text-neutral-400">{description}</p> : null}
      </div>
    </div>
  </a>
)

const NowPage = async () => {
  const data = await fetchData()

  const renderSectionContent = (section: NowJSON['sections'][number]) => {
    switch (section._id) {
      case 'books':
        return (
          <NowSectionContainer>
            {section.data.map((item) => (
              <NowSectionItem
                key={item.url}
                title={item.title}
                url={item.url}
                description={`by ${item.author}`}
                alt={`${item.title} by ${item.author}`}
                image={{
                  type: 'vertical',
                  alt: `Cover of book ${item.title}`,
                  src: item.imageURL,
                }}
              />
            ))}
          </NowSectionContainer>
        )

      case 'music':
        return (
          <NowSectionContainer>
            {section.data.map((item) => (
              <NowSectionItem
                key={item.url}
                title={item.creator}
                url={item.url}
                alt={item.title}
                image={{
                  alt: `Cover of album ${item.title}`,
                  src: item.imageURL,
                  type: 'square',
                }}
              />
            ))}
          </NowSectionContainer>
        )

      case 'shows':
        return (
          <NowSectionContainer>
            {section.data.map((item) => (
              <NowSectionItem
                key={item.url}
                title={item.title}
                url={item.url}
                alt={item.title}
                image={{
                  alt: `Poster of TV show ${item.title}`,
                  src: item.imageURL,
                  type: 'vertical',
                }}
              />
            ))}
          </NowSectionContainer>
        )
    }
  }

  return (
    <Page header={nowCopy}>
      <div className="flex flex-col gap-8">
        {data.sections
          .filter((section) => section.data && section.data.length > 0)
          .map((section) => (
            <div key={section._id} className="flex flex-col gap-3">
              <h4>{section.title}</h4>
              {renderSectionContent(section)}
            </div>
          ))}
      </div>

      <p className="mt-4 text-sm text-neutral-400">Last updated on {formatDate(data.updatedAt)}</p>
    </Page>
  )
}

export default NowPage
