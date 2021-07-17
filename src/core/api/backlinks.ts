import { Content, ContentType } from 'types'
import { getContentList } from './content'
import { sortContent } from './utils'

const BACKLINKED_CONTENT_TYPES: ContentType[] = ['book', 'note']

const getBacklinkedItems = async () => {
  const fetcher = BACKLINKED_CONTENT_TYPES.map((type) =>
    getContentList(type, { withDetails: true }),
  )

  const markdownContents = (await Promise.all(fetcher)).flat() as Content[]

  return sortContent(markdownContents)
}

const getTargetContentLinkRegex = (content: Content) => {
  switch (content.type) {
    case 'note':
      return `/notes/${content.slug}`
    case 'book':
      return `/books/${content.slug}`
    default:
      return '__'
  }
}

const getLinks = (source: Content, target: Content) => {
  const regex = getTargetContentLinkRegex(target)
  const linked = source.markdown.includes(regex)
  return linked
}

export const getLinksToContent = async (content: Content) => {
  const items = await getBacklinkedItems()
  return items
    .filter((c) => c.slug !== content.slug)
    .filter((c) => getLinks(c, content))
    .sort((a, b) => {
      if (a.type === b.type) {
        return a.slug > b.slug ? 1 : -1
      }

      switch (b.type) {
        case 'book':
          return 1

        case 'note':
        default:
          return -1
      }
    })
}
