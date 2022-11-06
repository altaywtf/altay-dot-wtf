import { API_URL } from 'config'
import PostPage, { PostPageProps } from './PostPage'

const fetchData = async (slug: string): Promise<PostPageProps['data']> => {
  const { post, markdown } = await fetch(`${API_URL}/posts/${slug}`).then((res) => res.json())

  const { backlinks } = await fetch(`${API_URL}/backlinks?type=posts&slug=${slug}`).then((res) =>
    res.json(),
  )

  return {
    post,
    markdown,
    backlinks,
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchData(params.slug)
  return <PostPage data={data} />
}

export default Page
