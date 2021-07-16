import type { InferGetStaticPropsType } from 'next'
import type { Now } from 'types'
import { Box, Text } from 'rebass'
import { nowCopy } from 'config/copy'
import { getMarkdownFileNames } from 'core/api/fs'
import { getContentDetails } from 'core/api/content'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'
import { formatDate } from 'utils/date'

export const getStaticProps = async () => {
  const [latest] = getMarkdownFileNames('now').reverse()

  return {
    props: {
      data: await getContentDetails<Now>('now', latest),
    },
  }
}

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader
      {...nowCopy}
      metaDescription={`What am I doing as of ${formatDate(data.meta.date)}`}
    />
    <Box m={4} />
    <Markdown>{data.markdown}</Markdown>
    <Box m={4} />
    <Text fontSize={0} color="textTertiary">
      Last updated at {formatDate(data.meta.date)}
    </Text>
  </>
)

export default NowPage
