import { Heading, Text } from 'theme-ui'
import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import Markdown from './Markdown'

type Props = {
  title: string
  icon?: string
  description?: string
}

const PageHeader: React.FC<Props> = ({ title, description }) => (
  <>
    <NextSeo
      title={title}
      openGraph={{
        title: title,
        images: [
          getOpenGraphImage({
            type: 'page',
            title: title,
          }),
        ],
      }}
    />

    <Heading as="h2">{title}</Heading>

    {description ? (
      <Text sx={{ '*': { color: 'textSecondary' } }}>
        <Markdown>{description}</Markdown>
      </Text>
    ) : null}
  </>
)

export default PageHeader
