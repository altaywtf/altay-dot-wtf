import qs from 'query-string'
import type { QueryBook } from './fetchBooks'
import type { BaseBook } from './types'

export const mapQueryBookToBaseBook = (queryBook: QueryBook): BaseBook => {
  const removeEdgeFromBookCover = (coverURL: string) => {
    const { url, query } = qs.parseUrl(coverURL)
    return qs.stringifyUrl({ url, query: { ...query, edge: undefined } })
  }

  return {
    title: queryBook.volumeInfo.title,
    authors: queryBook.volumeInfo.authors,
    identifiers: queryBook.volumeInfo.industryIdentifiers,
    remoteCoverImage: {
      url: removeEdgeFromBookCover(queryBook.volumeInfo.imageLinks.thumbnail),
    },
  }
}
