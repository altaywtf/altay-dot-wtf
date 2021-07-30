import type { GoogleBooksIndustryIdentifier } from './fetchBooks'

export type BaseBook = {
  title: string
  authors: string[]
  identifiers: GoogleBooksIndustryIdentifier[]
  remoteCoverImage: { url: string }
}

export type BaseBookWithMeta = BaseBook & {
  dateRead: string
  slug: string
  rating: 1 | 2 | 3 | 4 | 5
  quote: string
}

export type Book = BaseBookWithMeta & {
  coverImage: {
    url: string
    blurhash: string
    aspectRatio: number
  }
  notes: {
    url: string
  }
}

export type BooksJSON = {
  updatedAt: string
  books: Book[]
}

export const createBooksJSON = ({ books }: { books: Book[] }): BooksJSON => ({
  updatedAt: new Date().toISOString(),
  books,
})
