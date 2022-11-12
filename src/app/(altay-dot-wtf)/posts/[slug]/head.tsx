import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import { fetchData } from './fetchData'

const Head = async ({ params }: { params: { slug: string } }) => {
  const { post } = await fetchData(params.slug)

  return (
    <NextSeo
      useAppDir
      title={post.title}
      description={post.oneliner}
      openGraph={{
        title: post.title,
        description: post.oneliner,
        type: 'article',
        article: {
          authors: ['altaywtf'],
          modifiedTime: post.date,
        },
        images: [
          getOpenGraphImage({
            type: 'post',
            title: post.title,
            oneliner: post.oneliner,
          }),
        ],
      }}
    />
  )
}

export default Head
