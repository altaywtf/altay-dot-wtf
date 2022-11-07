import PostPage from './PostPage'
import { fetchData } from './fetchData'

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug)
  return <PostPage data={data} />
}

export default Page
