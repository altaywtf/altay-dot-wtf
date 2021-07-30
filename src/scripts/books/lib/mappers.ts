import type { QueryBook } from './fetchBooks'
import type { BaseBook } from './types'

export const mapQueryBookToBaseBook = (queryBook: QueryBook): BaseBook => {
  const isbn13 = queryBook.volumeInfo.industryIdentifiers.find((i) => i.type === 'ISBN_13')
  const isbn10 = queryBook.volumeInfo.industryIdentifiers.find((i) => i.type === 'ISBN_10')

  if (!isbn13 || !isbn10) {
    throw new Error('No identifiers')
  }

  return {
    title: queryBook.volumeInfo.title,
    authors: queryBook.volumeInfo.authors,
    identifier: isbn13
      ? { type: 'ISBN_13', value: isbn13.identifier }
      : { type: 'ISBN_10', value: isbn10.identifier },
    remoteCoverImage: {
      url: queryBook.volumeInfo.imageLinks.thumbnail,
    },
  }
}
