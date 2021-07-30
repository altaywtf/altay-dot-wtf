import axios from 'axios'
import { mapQueryBookToBaseBook } from './mappers'

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY as string

export type GoogleBooksIndustryIdentifier =
  | { type: 'OTHER'; identifier: string }
  | { type: 'ISBN_13'; identifier: string }
  | { type: 'ISBN_10'; identifier: string }

type GoogleBooksVolume = {
  volumeInfo: {
    title: string
    authors: string[]
    imageLinks: {
      thumbnail: string
    }
    industryIdentifiers: GoogleBooksIndustryIdentifier[]
  }
}

type GoogleBooksVolumeQueryResult = {
  totalItems: number
  items: GoogleBooksVolume[]
}

export type QueryBook = GoogleBooksVolume
export type BooksQueryResult = GoogleBooksVolumeQueryResult

export const fetchBooksByQuery = async (query: string) => {
  const response = await axios.get<BooksQueryResult>(
    'https://www.googleapis.com/books/v1/volumes',
    {
      params: {
        q: query,
        maxResults: 40, // literally max
        key: GOOGLE_BOOKS_API_KEY,
      },
    },
  )

  return response.data.items
    .filter((i) => i.volumeInfo.authors && i.volumeInfo.authors.length > 0)
    .filter((i) => i.volumeInfo.industryIdentifiers && i.volumeInfo.industryIdentifiers.length > 0)
    .filter((i) => !!i.volumeInfo.imageLinks)
    .map(mapQueryBookToBaseBook)
}
