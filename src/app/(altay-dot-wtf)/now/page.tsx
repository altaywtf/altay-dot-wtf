import { Metadata } from 'next'
import { API_URL, nowCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Image from 'next/image'
import Page from 'ui/Page'
import { formatDate } from 'lib/utils/date'
import type { NowJSON } from 'scripts/now/lib/types'

const fetchData = async () => {
  const res = await fetch(`${API_URL}/now`, { cache: 'no-cache' })
  const { now } = await res.json()
  return now as NowJSON
}

const NowSectionContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row flex-wrap gap-4">{children}</div>
)

const NowSectionItem = ({
  alt,
  title,
  description,
  url,
  image,
}: {
  alt: string
  title: string
  description?: string
  url: string
  image: React.ReactNode
}) => (
  <a
    key={url}
    href={url}
    title={alt}
    target="_blank"
    rel="noreferrer noopener"
    className="max-w-[196px] transition duration-300 ease-in-out hover:scale-105"
  >
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded bg-neutral-900">{image}</div>

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
                image={
                  <div className="relative h-[196px] w-[140px]">
                    <Image
                      alt={`Cover of book ${item.title}`}
                      src={item.imageURL}
                      fill
                      className="rounded border border-neutral-800 object-cover"
                    />
                  </div>
                }
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
                image={
                  <div className="relative h-[196px] w-[196px]">
                    <Image
                      alt={`Cover of album ${item.title}`}
                      src={item.imageURL}
                      fill
                      className="object-cover"
                    />
                  </div>
                }
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
                image={
                  <div className="relative h-[196px] w-[140px]">
                    <Image
                      alt={`Poster of TV show ${item.title}`}
                      src={item.imageURL}
                      fill
                      className="object-cover"
                    />
                  </div>
                }
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
