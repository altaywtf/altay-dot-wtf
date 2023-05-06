import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { booksCopy } from 'config'

const Head = () => (
  <NextSeo
    useAppDir
    title={booksCopy.title}
    openGraph={{
      title: booksCopy.title,
      images: [
        getOpenGraphImage({
          type: 'page',
          title: booksCopy.title,
        }),
      ],
    }}
  />
)

export default Head
