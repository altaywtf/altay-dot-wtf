import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'lib/utils/openGraph'

const Head = () => (
  <NextSeo
    useAppDir
    title="Timeline"
    openGraph={{
      title: 'Timeline',
      images: [
        getOpenGraphImage({
          type: 'page',
          title: 'Timeline',
        }),
      ],
    }}
  />
)

export default Head
