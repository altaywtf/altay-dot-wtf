import { Content, ContentType } from 'types'
import { getContentList } from './content'

const BACKLINKED_CONTENT_TYPES: ContentType[] = ['note']

const getBacklinkedItems = async () => {
  const fetcher = BACKLINKED_CONTENT_TYPES.map((type) => getContentList(type))
  return (await Promise.all(fetcher)).flat() as Content[]
}

const getTargetContentLinkRegex = (content: Content) => {
  switch (content.type) {
    case 'note':
      return `/notes/${content.slug}`
    // case 'book':
    //   return `/books/${content.slug}`
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
        return Date.parse(a.meta.date) > Date.parse(b.meta.date) ? -1 : 1
      }

      switch (b.type) {
        // case 'book':
        //   return 1

        case 'note':
        default:
          return -1
      }
    })
}
