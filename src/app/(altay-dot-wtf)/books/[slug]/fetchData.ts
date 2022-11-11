import { getBook } from 'api/books'
import { getBacklinks } from 'api/backlinks'
import type { BookPageProps } from './BookPage'

export const fetchData = async (slug: string): Promise<BookPageProps['data']> => {
  const { book, markdown } = getBook(slug)
  const backlinks = getBacklinks({ type: 'book', slug })

  return {
    book,
    markdown,
    backlinks,
  }
}
