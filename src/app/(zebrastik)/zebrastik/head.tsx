import { NextSeo } from 'next-seo'
import { zebrastikCopy } from 'config'

const Head = () => (
  <NextSeo
    useAppDir
    title="zebrastik"
    titleTemplate="%s"
    description={zebrastikCopy.description}
    openGraph={{
      title: 'zebrastik',
      description: zebrastikCopy.description,
    }}
  />
)

export default Head
