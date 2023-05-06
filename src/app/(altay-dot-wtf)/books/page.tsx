import { Metadata } from 'next'
import { API_URL, booksCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import BooksPage, { BooksPageProps } from './BooksPage'

const fetchData = async (): Promise<BooksPageProps['data']> =>
  await fetch(`${API_URL}/books`).then((res) => res.json())

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

const Page = async () => {
  const data = await fetchData()
  return <BooksPage data={data} />
}

export default Page
