export type { NowJSON } from '../scripts/now/lib/types'

export type Meta = {
  date: string
}

export type MDContent = {
  slug: string
  markdown: string
  meta: Meta
}

export type About = MDContent & {
  type: 'about'
}

export type Note = MDContent & {
  type: 'note'
  meta: Meta & {
    title: string
    oneliner: string
    readingTime: string
  }
}

export type Book = MDContent & {
  type: 'book'
  meta: Meta & {
    title: string
    oneliner: string
    author: string
    coverImage: {
      remoteURL: string
      url: string
      aspectRatio: number
      blurhash: string
    }
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

export type Content = About | Note | Book
export type ContentType = Content['type']
