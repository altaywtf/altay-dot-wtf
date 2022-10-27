import { Heading, Box } from 'theme-ui'
import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'utils/openGraph'
import Markdown from './Markdown'

type Props = {
  header: {
    title: string
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

      <Heading as="h3">{header.title}</Heading>

      {header.description ? (
        <Box mt={3}>
          <Markdown>{header.description}</Markdown>
        </Box>
      ) : null}
    </Box>
    {children}
  </>
)

export default Page
