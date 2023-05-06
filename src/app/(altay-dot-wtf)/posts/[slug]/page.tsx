import { Metadata } from 'next'
import { API_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import PostPage, { PostPageProps } from './PostPage'

type Props = {
  params: { slug: string }
}

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

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { post } = await fetchData(params.slug)

  return {
    title: post.title,
    description: post.oneliner,
    openGraph: {
      title: post.title,
      description: post.oneliner,
      type: 'article',
      authors: ['altaywtf'],
      modifiedTime: post.date,
      images: getOpenGraphImage({
        type: 'post',
        title: post.title,
        oneliner: post.oneliner,
      }),
    },
  }
}

const Page = async ({ params }: Props) => {
  const data = await fetchData(params.slug)
  return <PostPage data={data} />
}

export default Page
