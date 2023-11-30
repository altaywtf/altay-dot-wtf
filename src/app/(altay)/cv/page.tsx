import { readMarkdownFile } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { Metadata } from 'next'
import Markdown from 'ui/Markdown'

export const generateMetadata = async (): Promise<Metadata> => ({
  openGraph: {
    images: getOpenGraphImage({
      title: 'CV',
      type: 'page',
    }),
  },
  title: "Altay's CV",
})

const CV = () => (
  <section className="app-width px-4 py-8 print:invert sm:px-0">
    <Markdown>{readMarkdownFile('cv.md')}</Markdown>
  </section>
)

export default CV
