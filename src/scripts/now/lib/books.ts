import axios from 'axios'
import type { NowJSONBook } from './types'

type OkuCollectionResponse = {
  books: {
    id: string
    slug: string
    title: string
    authors: { name: string }[]
    thumbnail: string
  }[]
}

export const fetchBooks = async ({ userToken }: { userToken: string }): Promise<NowJSONBook[]> => {
  const OKU_COLLECTION_URL = 'https://oku.club/api/collections/user/altaywtf/reading'

  const response = await axios.get<OkuCollectionResponse>(OKU_COLLECTION_URL, {
    headers: {
      authorization: `Token ${userToken}`,
    },
  })

  return response.data.books.map((okuBook) => ({
    url: `https://oku.club/book/${okuBook.slug}`,
    title: okuBook.title,
    creator: okuBook.authors.map((author) => author.name).join(', '),
    imageURL: okuBook.thumbnail,
  }))
}
