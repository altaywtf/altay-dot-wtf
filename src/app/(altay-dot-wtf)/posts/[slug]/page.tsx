import { Metadata } from 'next'
import { API_URL, postsCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import ArtificialBackButton from 'ui/ArtificialBackButton'
import Backlinks from 'ui/Backlinks'
import Markdown from 'ui/Markdown'
import { PostDateAndReadingTime } from '../components/PostDateAndReadingTime'

type Props = {
  params: { slug: string }
}

const fetchData = async (slug: string) => {
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
  const { post, markdown, backlinks } = await fetchData(params.slug)

  return (
    <div className="flex flex-col gap-6">
      <ArtificialBackButton href="/posts" label={postsCopy.title} />

      <div className="flex flex-col gap-2">
        <h1>{post.title}</h1>
        <PostDateAndReadingTime post={post} />
      </div>

      <Markdown>{markdown}</Markdown>

      <Backlinks sourceType="post" sourceURL={post.url} backlinks={backlinks} />
    </div>
  )
}

export default Page
