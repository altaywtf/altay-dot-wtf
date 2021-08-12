import axios from 'axios'
import type { NowJSONBook } from './types'

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
  const OKU_COLLECTION_URL = 'https://oku.club/api/collections/user/altay/reading'

  const response = await axios.get<OkuCollectionResponse>(OKU_COLLECTION_URL, {
    headers: {
      authorization: `Token ${process.env.OKU_USER_TOKEN}`,
    },
  })

  return response.data.books.map((okuBook) => ({
    url: `https://oku.club/book/${okuBook.slug}`,
    title: okuBook.title,
    subtitle: okuBook.subtitle,
    author: okuBook.authors.map((author) => author.name).join(', '),
    imageURL: okuBook.thumbnail,
  }))
}
