import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'
import { Book, BooksJSON, createBooksJSON } from './types'

const BOOKS_JSON_PATH = `${DATA_FOLDER_PATH}/books.json`

export const readBooksJSON = () => {
  const file = fs.readFileSync(BOOKS_JSON_PATH)
  return JSON.parse(file.toString()) as BooksJSON
}

export const writeBooksJSON = (booksJSON: BooksJSON) => {
  const contents = JSON.stringify(booksJSON, null, 2)
  fs.writeFileSync(BOOKS_JSON_PATH, contents)
}

export const addBookToBooksJSON = (book: Book) => {
  const booksJSON = readBooksJSON()

  const newBooksJSON = createBooksJSON({
    books: (booksJSON.books || [])
      .filter((b) => b.slug !== book.slug)
      .concat(book)
      .sort((a, b) => (Date.parse(a.dateRead) > Date.parse(b.dateRead) ? -1 : 1)),
  })

  writeBooksJSON(newBooksJSON)

  return newBooksJSON
}
