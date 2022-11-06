import { API_URL } from 'config'
import BookPage, { BookPageProps } from './BookPage'

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

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug)
  return <BookPage data={data} />
}

export default Page
