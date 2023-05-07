import { API_URL, SITE_URL, booksCopy } from 'config'
import { Metadata } from 'next'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Markdown from 'ui/Markdown'
import ArtificialBackButton from 'ui/ArtificialBackButton'
import Backlinks from 'ui/Backlinks'
import type { Book } from 'lib/books'
import type { Backlink } from 'lib/backlinks'
import { BookCover } from '../components/BookCover'
import { BookReadDateAndRating } from '../components/BookReadDateAndRating'

type Props = {
  params: { slug: string }
}

const fetchData = async (
  slug: string,
): Promise<{
  book: Book
  markdown: string
  backlinks: Backlink[]
}> => {
  const { book, markdown } = await fetch(`${API_URL}/books/${slug}`).then((res) => res.json())
  const { backlinks } = await fetch(`${API_URL}/backlinks?type=books&slug=${slug}`).then((res) =>
    res.json(),
  )

  return {
    book,
    markdown,
    backlinks,
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { book } = await fetchData(params.slug)
  const title = `${book.title} by ${book.authors.join(', ')}`

  return {
    title,
    description: book.quote,
    openGraph: {
      title,
      description: book.quote,
      images: getOpenGraphImage({
        type: 'book',
        title: book.title,
        author: book.authors.join(', '),
        coverImageURL: SITE_URL + book.coverImage.url,
      }),
    },
  }
}

const BookPage = async ({ params }: Props) => {
  const { book, markdown, backlinks } = await fetchData(params.slug)

  return (
    <div className="flex flex-col gap-6">
      <ArtificialBackButton href="/books" label={booksCopy.title} />

      <div key={book.slug} className="flex flex-row gap-4">
        <div className="min-w-[160px]">
          <BookCover book={book} />
        </div>

        <div className="flex flex-col gap-2">
          <h1>
            {book.title} by {book.authors.join(', ')}
          </h1>

          <BookReadDateAndRating book={book} />

          <p className="italic text-neutral-400">&quot;{book.quote}&quot;</p>
        </div>
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks sourceType="book" sourceURL={book.notes.url} backlinks={backlinks} />
    </div>
  )
}

export default BookPage
