import { Heading, Text, Box } from 'theme-ui'
import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import Markdown from './Markdown'

type Props = {
  header: {
    title: string
    icon?: string
    description?: string
  }
}

const Page: React.FC<Props> = ({ header, children }) => (
  <>
    <Box mb={4}>
      <NextSeo
        title={header.title}
        openGraph={{
          title: header.title,
          images: [
            getOpenGraphImage({
              type: 'page',
              title: header.title,
            }),
          ],
        }}
      />

      <Heading as="h2">{header.title}</Heading>

      {header.description ? (
        <Text sx={{ '*': { color: 'textSecondary' } }}>
          <Markdown>{header.description}</Markdown>
        </Text>
      ) : null}
    </Box>
    {children}
  </>
)

export default Page
