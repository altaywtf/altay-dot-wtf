import type { NowJSONBook } from './types'
import { REVALIDATE_NOWJSON_IN_SECONDS } from './constants'

type OkuCollectionResponse = {
  books: {
    id: string
    slug: string
    title: string
    subtitle: string
    authors: { name: string }[]
    thumbnail: string
  }[]
}

export const fetchBooks = async (): Promise<NowJSONBook[]> => {
  const OKU_COLLECTION_URL = 'https://oku.club/api/collections/user/altay/reading?format=json'

  const response = await fetch(OKU_COLLECTION_URL, {
    next: { revalidate: REVALIDATE_NOWJSON_IN_SECONDS },
  })

  const data = (await response.json()) as OkuCollectionResponse

  return data.books.map((okuBook) => ({
    url: `https://oku.club/book/${okuBook.slug}`,
    title: okuBook.title,
    subtitle: okuBook.subtitle,
    author: okuBook.authors.map((author) => author.name).join(', '),
    imageURL: okuBook.thumbnail,
  }))
}
