import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import { postsCopy } from 'config'

const Head = () => (
  <NextSeo
    useAppDir
    title={postsCopy.title}
    openGraph={{
      title: postsCopy.title,
      images: [
        getOpenGraphImage({
          type: 'page',
          title: postsCopy.title,
        }),
      ],
    }}
  />
)

export default Head
