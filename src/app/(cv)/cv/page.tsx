import { Metadata } from 'next'
import { readMarkdownFile } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Markdown from 'ui/Markdown'

export const generateMetadata = async (): Promise<Metadata> => ({
  title: `Altay's CV`,
  openGraph: {
    images: getOpenGraphImage({
      type: 'page',
      title: 'CV',
    }),
  },
})

const CV = () => (
  <main className="px-4 py-8 print:invert sm:px-0">
    <Markdown>{readMarkdownFile('cv.md')}</Markdown>
  </main>
)

export default CV
