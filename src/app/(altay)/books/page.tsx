import type { Book } from 'lib/books'

import { API_URL, booksCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { Metadata } from 'next'
import NextLink from 'next/link'
import ArtificialBackButton from 'ui/ArtificialBackButton'
import Page from 'ui/Page'

import { BookCover } from './components/BookCover'
import { BookReadDateAndRating } from './components/BookReadDateAndRating'

const fetchData = (): Promise<{ books: Book[] }> =>
  fetch(`${API_URL}/books`).then((res) => res.json())

export const generateMetadata = async (): Promise<Metadata> => ({
  openGraph: {
    description: booksCopy.description,
    images: getOpenGraphImage({
      title: booksCopy.title,
      type: 'page',
    }),
    title: booksCopy.title,
  },
  title: booksCopy.title,
})

const BooksPage = async () => {
  const data = await fetchData()

  return (
    <>
      <div className="mb-6">
        <ArtificialBackButton href="/" label="altay.wtf" />
      </div>

      <Page header={booksCopy}>
        <div className="flex flex-col gap-10">
          {data.books.map((book) => (
            <div className="flex flex-row gap-4" key={book.slug}>
              <NextLink className="min-w-[96px] sm:min-w-[120px]" href={`/books/${book.slug}`}>
                <BookCover book={book} />
              </NextLink>

              <div>
                <div>
                  <NextLink
                    className="font-medium text-amber-400 hover:text-amber-200"
                    href={`/books/${book.slug}`}
                  >
                    {book.title} by {book.authors.join(', ')}
                  </NextLink>
                </div>

                <BookReadDateAndRating book={book} />

                <p className="italic text-neutral-400">&quot;{book.quote}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  )
}

export default BooksPage
