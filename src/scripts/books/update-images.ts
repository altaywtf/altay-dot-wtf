import { readBooksJSON, writeBooksJSON } from './lib/booksJSON'
import { createBookCoverImage } from './lib/image'
import { createBooksJSON } from './lib/types'

const main = async () => {
  const { books } = readBooksJSON()

  const updatedbooks = await Promise.all(
    books.map(async (book) => ({
      ...book,
      coverImage: await createBookCoverImage(book),
    })),
  )

  writeBooksJSON(createBooksJSON({ books: updatedbooks }))
}

main()
