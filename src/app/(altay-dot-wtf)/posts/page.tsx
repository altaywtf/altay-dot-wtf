import { Metadata } from 'next'
import { API_URL, postsCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import PostsPage, { PostsPageProps } from './PostsPage'

const fetchData = async (): Promise<PostsPageProps['data']> =>
  await fetch(`${API_URL}/posts`).then((res) => res.json())

export const generateMetadata = async (): Promise<Metadata> => ({
  title: postsCopy.title,
  openGraph: {
    title: postsCopy.title,
    images: getOpenGraphImage({
      type: 'page',
      title: postsCopy.title,
    }),
  },
})

const Page = async () => {
  const data = await fetchData()
  return <PostsPage data={data} />
}

export default Page
