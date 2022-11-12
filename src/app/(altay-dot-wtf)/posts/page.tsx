import { API_URL } from 'config'
import PostsPage, { PostsPageProps } from './PostsPage'

const fetchData = async (): Promise<PostsPageProps['data']> =>
  await fetch(`${API_URL}/posts`).then((res) => res.json())

const Page = async () => {
  const data = await fetchData()
  return <PostsPage data={data} />
}

export default Page
