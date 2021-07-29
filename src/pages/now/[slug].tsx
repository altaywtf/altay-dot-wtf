import type { InferGetStaticPropsType } from 'next'
import type { Now } from 'types'
import { Box } from 'rebass'
import { format } from 'date-fns'
import { nowHistoryCopy } from 'config/copy'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'

export const getStaticPaths = getStaticPathsForContent('now')
export const getStaticProps = getStaticPropsForContentDetails<Now>('now')

const NowArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader
      {...nowHistoryCopy}
      description={`What I was doing around ${format(new Date(data.meta.date), 'MMMM yyyy')}`}
    />
    <Box m={4} />
    <Markdown>{data.markdown}</Markdown>
  </>
)

export default NowArchivePage
