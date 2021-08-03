import { readBooksJSON } from 'scripts/books/lib/booksJSON'
import { readMarkdownFile } from 'utils/md'

export type { Book } from 'scripts/books/lib/types'

export const getBooks = () => readBooksJSON().books

export const getBook = (slug: string) => {
  const book = readBooksJSON().books.find((book) => book.slug === slug)

  if (!book) {
    throw new Error(`Book not found: ${slug}.`)
  }

  return {
    book,
    markdown: readMarkdownFile(`${book.notes.url}.md`),
  }
}

export const getBooksWithMarkdown = () => getBooks().map((book) => getBook(book.slug))
