import { API_URL } from 'config'
import { BookPageProps } from './BookPage'

export const fetchData = async (slug: string): Promise<BookPageProps['data']> => {
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
