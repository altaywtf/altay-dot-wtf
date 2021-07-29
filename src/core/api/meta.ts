import type { Note, Book, Content, ContentType } from 'types'
import readingTime from 'reading-time'
import { fetchBookData, fetchBookImage } from './books'
import { getImageData } from './image'

const getNoteMeta = async ({
  meta,
  content,
}: {
  meta: Note['meta']
  content: Note['markdown']
}): Promise<Note['meta']> => {
  const imageParams = new URLSearchParams()
  imageParams.append('type', 'note')
  imageParams.append('title', meta.title)
  imageParams.append('oneliner', meta.oneliner)

  return {
    ...meta,
    readingTime: readingTime(content).text,
  }
}

const getBookMeta = async ({
  slug,
  meta,
}: {
  slug: string
  meta: Book['meta']
}): Promise<Book['meta']> => {
  const { coverImageURL: remoteCoverImageURL, title, authors } = await fetchBookData(meta.isbn)
  const author = authors.join(', ')

  const coverImageURL = await fetchBookImage(slug, remoteCoverImageURL)
  const coverImageData = await getImageData(coverImageURL)

  return {
    ...meta,
    title,
    author,
    coverImage: {
      remoteURL: remoteCoverImageURL,
      url: coverImageURL,
      blurhash: coverImageData.blurhash,
      aspectRatio: coverImageData.ratio,
    },
  }
}

export const getMeta = async <T extends Content>({
  type,
  slug,
  meta,
  content,
}: {
  type: ContentType
  slug: string
  meta: Record<string, unknown>
  content: string
}): Promise<T['meta']> => {
  switch (type) {
    case 'book': {
      return getBookMeta({ slug, meta: meta as Book['meta'] })
    }

    case 'note':
      return getNoteMeta({ content, meta: meta as Note['meta'] })

    default:
      return meta as T['meta']
  }
}
