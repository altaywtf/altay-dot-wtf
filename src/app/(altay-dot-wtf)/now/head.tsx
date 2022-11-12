import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import { nowCopy } from 'config'

const Head = () => (
  <NextSeo
    useAppDir
    title={nowCopy.title}
    openGraph={{
      title: nowCopy.title,
      images: [
        getOpenGraphImage({
          type: 'page',
          title: nowCopy.title,
        }),
      ],
    }}
  />
)

export default Head
