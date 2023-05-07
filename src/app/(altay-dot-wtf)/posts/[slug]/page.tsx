import { Metadata } from 'next'
import { API_URL, postsCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { formatDate } from 'lib/utils/date'
import ArtificialBackButton from 'ui/ArtificialBackButton'
import Backlinks from 'ui/Backlinks'
import Markdown from 'ui/Markdown'

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
  const data = await fetchData(params.slug)

  return (
    <>
      <div className="flex flex-col gap-4">
        <ArtificialBackButton href="/posts" label={postsCopy.title} />

        <div>
          <h1>{data.post.title}</h1>

          <div className="flex flex-row gap-1 text-zinc-400">
            {formatDate(data.post.date)}
            <span>·</span>
            {data.post.readingTime}
          </div>
        </div>
      </div>

      <Markdown>{data.markdown}</Markdown>

      <Backlinks sourceType="post" sourceURL={data.post.url} backlinks={data.backlinks} />
    </>
  )
}

export default Page
