import { API_URL } from 'config'
import BooksPage, { BooksPageProps } from './BooksPage'

const fetchData = async (): Promise<BooksPageProps['data']> =>
  await fetch(`${API_URL}/books`).then((res) => res.json())

const Page = async () => {
  const data = await fetchData()
  return <BooksPage data={data} />
}

export default Page
