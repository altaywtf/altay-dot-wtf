import axios from 'axios'
import { mapQueryBookToBaseBook } from './mappers'

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY as string

type GoogleBooksIndustryIdentifier =
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
        key: GOOGLE_BOOKS_API_KEY,
      },
    },
  )

  return response.data.items
    .filter((i) => i.volumeInfo.authors && i.volumeInfo.authors.length > 0)
    .map(mapQueryBookToBaseBook)
}
