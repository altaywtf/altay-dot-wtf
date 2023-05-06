import { API_URL, SITE_URL } from 'config'
import { Metadata } from 'next'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import BookPage, { BookPageProps } from './BookPage'

type Props = {
  params: { slug: string }
}

const fetchData = async (slug: string): Promise<BookPageProps['data']> => {
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

const Page = async ({ params }: Props) => {
  const data = await fetchData(params.slug)
  return <BookPage data={data} />
}

export default Page
