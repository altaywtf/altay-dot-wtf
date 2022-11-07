import BookPage from './BookPage'
import { fetchData } from './fetchData'

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug)
  return <BookPage data={data} />
}

export default Page
