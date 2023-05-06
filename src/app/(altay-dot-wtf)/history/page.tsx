import { Metadata } from 'next'
import { readMarkdownFile } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import HistoryPage from './HistoryPage'
import { historyCopy } from 'config'

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

const Page = () => <HistoryPage data={readMarkdownFile('history.md')} />

export default Page
