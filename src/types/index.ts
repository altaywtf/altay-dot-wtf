export type MetaImage = {
  url: string
  width: number
  height: number
}

export type BaseMeta = {
  tags: string[] | undefined
  draft: boolean
  date: string
}

export type BaseMDMeta = BaseMeta

export type BaseMDContent = {
  slug: string
  markdown: string
  meta: BaseMDMeta
}

export type About = BaseMDContent & {
  type: 'about'
}

export type Now = BaseMDContent & {
  type: 'now'
}

export type Note = BaseMDContent & {
  type: 'note'
  meta: BaseMDMeta & {
    title: string
    oneliner: string
    readingTime: string
  }
}

export type Book = BaseMDContent & {
  type: 'book'
  meta: BaseMDMeta & {
    title: string
    oneliner: string
    authors: string[]
    coverImage: {
      url: string
      aspectRatio: number
      blurhash: string
    }
    metaImage: MetaImage
    isbn: string
    rating: string
  }
}

export type Bookmark = {
  type: 'bookmark'
  url: string
  host: string
  title: string
  description: string
}

export type Playlist = {
  type: 'playlist'
  id: string
  name: string
  description: string
  url: string
  image: {
    url: string
  }
}

export type Content = Now | Note | Book | About
export type ContentType = Content['type']

export type TaggedItem = Note | Book
export type TaggedItemType = TaggedItem['type']
export const TAGGED_ITEM_TYPES: TaggedItem['type'][] = ['note', 'book']

export const isTaggedItem = (taggedItem: Content): taggedItem is TaggedItem => {
  return (TAGGED_ITEM_TYPES as string[]).includes(taggedItem.type)
}
