import inquirer from 'inquirer'
import slugify from 'slugify'

import type { BaseBook, BaseBookWithMeta, Book } from './lib/types'

import '../env'
import { addBookToBooksJSON } from './lib/booksJSON'
import { fetchBooksByQuery } from './lib/fetchBooks'
import { createBookCoverImage } from './lib/image'
import { createBookNotes } from './lib/notes'

const runAskBookQueryStep = async (): Promise<string> => {
  const { query } = await inquirer.prompt<{ query: string }>([
    {
      name: 'query',
      type: 'input',
    },
  ])

  return query
}

const runSearchAndChooseStep = async (query: string) => {
  const data = await fetchBooksByQuery(query)

  const { bookIndex } = await inquirer.prompt<{ bookIndex: number }>([
    {
      choices: data
        .map((item, index) => [
          {
            name: `${index}. ${item.title} by ${item.authors.join(', ')} \n [${
              item.remoteCoverImage.url
            }]`,
            value: index,
          },
          new inquirer.Separator(),
        ])
        .flat(),
      name: 'bookIndex',
      type: 'list',
    },
  ])

  return data[bookIndex]
}

const runGetBaseBookMetaStep = async (
  baseBook: BaseBook,
): Promise<BaseBookWithMeta> => {
  const { dateRead, quote, rating, remoteCoverImageURL, slug, title } =
    await inquirer.prompt<BaseBookWithMeta & { remoteCoverImageURL: string }>([
      {
        default: baseBook.title,
        name: 'title',
        type: 'input',
      },
      {
        default: slugify(baseBook.title, { lower: true }),
        name: 'slug',
        type: 'input',
      },
      {
        default: baseBook.remoteCoverImage.url,
        name: 'remoteCoverImageURL',
        type: 'input',
      },
      {
        name: 'rating',
        type: 'number',
      },
      {
        name: 'quote',
        type: 'input',
      },
      {
        name: 'dateRead',
        type: 'input',
      },
    ])

  return {
    ...baseBook,
    dateRead,
    quote,
    rating,
    remoteCoverImage: { url: remoteCoverImageURL },
    slug,
    title,
  }
}

const runCreateBookFromBaseBookWithMetaStep = async (
  baseBookWithMeta: BaseBookWithMeta,
): Promise<Book> => {
  return {
    ...baseBookWithMeta,
    coverImage: await createBookCoverImage(baseBookWithMeta),
    notes: createBookNotes(baseBookWithMeta),
  }
}

const main = async () => {
  const query = await runAskBookQueryStep()
  const baseBook = await runSearchAndChooseStep(query)
  const baseBookWithMeta = await runGetBaseBookMetaStep(baseBook)
  const book = await runCreateBookFromBaseBookWithMetaStep(baseBookWithMeta)
  const booksJSON = addBookToBooksJSON(book)
  console.log(
    `${book.title} has been added, we have ${booksJSON.books.length} books(s) now.`,
  )
}

main()
