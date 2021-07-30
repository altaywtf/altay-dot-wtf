import '../env'
import inquirer from 'inquirer'
import slugify from 'slugify'
import type { BaseBook, BaseBookWithMeta, Book } from './lib/types'
import { fetchBooksByQuery } from './lib/fetchBooks'
import { createBookNotes } from './lib/notes'
import { createBookCoverImage } from './lib/image'
import { addBookToBooksJSON } from './lib/booksJSON'

const runAskBookQueryStep = async (): Promise<string> => {
  const { query } = await inquirer.prompt<{ query: string }>([
    {
      type: 'input',
      name: 'query',
    },
  ])

  return query
}

const runSearchAndChooseStep = async (query: string) => {
  const data = await fetchBooksByQuery(query)

  const { bookIndex } = await inquirer.prompt<{ bookIndex: number }>([
    {
      type: 'list',
      name: 'bookIndex',
      choices: data
        .map((item, index) => [
          {
            value: index,
            name: `${index}. ${item.title} by ${item.authors.join(', ')} \n [${
              item.remoteCoverImage.url
            }]`,
          },
          new inquirer.Separator(),
        ])
        .flat(),
    },
  ])

  return data[bookIndex]
}

const runGetBaseBookMetaStep = async (baseBook: BaseBook): Promise<BaseBookWithMeta> => {
  const { title, slug, rating, quote, dateRead, remoteCoverImageURL } = await inquirer.prompt<
    BaseBookWithMeta & { remoteCoverImageURL: string }
  >([
    {
      type: 'input',
      name: 'title',
      default: baseBook.title,
    },
    {
      type: 'input',
      name: 'slug',
      default: slugify(baseBook.title, { lower: true }),
    },
    {
      type: 'input',
      name: 'remoteCoverImageURL',
      default: baseBook.remoteCoverImage.url,
    },
    {
      type: 'number',
      name: 'rating',
    },
    {
      type: 'input',
      name: 'quote',
    },
    {
      type: 'input',
      name: 'dateRead',
    },
  ])

  return {
    ...baseBook,
    title,
    slug,
    remoteCoverImage: { url: remoteCoverImageURL },
    rating,
    quote,
    dateRead,
  }
}

const runCreateBookFromBaseBookWithMetaStep = async (
  baseBookWithMeta: BaseBookWithMeta,
): Promise<Book> => {
  return {
    ...baseBookWithMeta,
    notes: createBookNotes(baseBookWithMeta),
    coverImage: await createBookCoverImage(baseBookWithMeta),
  }
}

const main = async () => {
  const query = await runAskBookQueryStep()
  const baseBook = await runSearchAndChooseStep(query)
  const baseBookWithMeta = await runGetBaseBookMetaStep(baseBook)
  const book = await runCreateBookFromBaseBookWithMetaStep(baseBookWithMeta)
  const booksJSON = addBookToBooksJSON(book)
  console.log(`${book.title} has been added, we have ${booksJSON.books.length} books(s) now.`)
}

main()
