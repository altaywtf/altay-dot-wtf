import { Metadata } from 'next'
import { API_URL, booksCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import type { Book } from 'lib/books'
import NextLink from 'next/link'
import Page from 'ui/Page'
import { BookCover } from './components/BookCover'
import { BookReadDateAndRating } from './components/BookReadDateAndRating'
import ArtificialBackButton from 'ui/ArtificialBackButton'

const fetchData = (): Promise<{ books: Book[] }> =>
  fetch(`${API_URL}/books`).then((res) => res.json())

export const generateMetadata = async (): Promise<Metadata> => ({
  title: booksCopy.title,
  openGraph: {
    title: booksCopy.title,
    description: booksCopy.description,
    images: getOpenGraphImage({
      type: 'page',
      title: booksCopy.title,
    }),
  },
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
            <div key={book.slug} className="flex flex-row gap-4">
              <NextLink href={`/books/${book.slug}`} className="min-w-[96px] sm:min-w-[120px]">
                <BookCover book={book} />
              </NextLink>

              <div>
                <div>
                  <NextLink
                    href={`/books/${book.slug}`}
                    className="font-medium text-amber-400 hover:text-amber-200"
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
