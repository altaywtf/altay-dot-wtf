import { Metadata } from 'next'
import { historyCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Page from 'ui/Page'
import Markdown from 'ui/Markdown'

export const generateMetadata = async (): Promise<Metadata> => ({
  ...historyCopy,
  openGraph: {
    ...historyCopy,
    images: getOpenGraphImage({
      type: 'page',
      title: historyCopy.title,
    }),
  },
})

const HistoryPage = () => (
  <Page header={historyCopy}>
    <Markdown>{readMarkdownFile('history.md')}</Markdown>
  </Page>
)

export default HistoryPage
