import type { InferGetStaticPropsType } from 'next'
import type { About } from 'types'
import { Box, Text, SxStyleProp } from 'rebass'
import { getContentDetails } from 'core/api/content'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'
import { homeCopy, aboutCopy } from 'config/copy'
import { formatDate } from 'utils/date'

export const getStaticProps = async () => ({
  props: await getContentDetails<About>('about', 'about'),
})

const sx: SxStyleProp = {
  '& > ul': {
    marginY: 3,
  },
  '& > ul > li': {
    marginY: 3,
  },
  '& > ul:nth-of-type(1) > li': {
    marginY: 1,
  },
}

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  meta,
  markdown,
}) => (
  <>
    <PageHeader {...aboutCopy} />

    <Box>
      <Markdown>{homeCopy.description}</Markdown>
      <Box m={6} />
      <Box sx={sx}>
        <Markdown>{markdown}</Markdown>
      </Box>
    </Box>

    <Box m={4} />

    <Text fontSize={0} color="textTertiary">
      Last updated at {formatDate(meta.date)}
    </Text>
  </>
)

export default AboutPage
