import { Metadata } from 'next'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import Header from 'ui/Header'
import { PathHistoryListener } from 'ui/PathHistoryListener'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: getOpenGraphImage({
      type: 'page',
      title: SITE_DESCRIPTION,
    }),
  },
} as const

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <main>
      <Header />

      <section className="min-h-screen px-3 py-4 sm:px-0">{children}</section>

      <footer className="mt-3 flex justify-between px-3 py-3 font-mono text-xs text-neutral-400  sm:px-0">
        <a
          href="https://twitter.com/altaywtf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          @altaywtf
        </a>

        <a
          href="https://github.com/altaywtf/altay-dot-wtf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Source
        </a>
      </footer>
    </main>

    <PathHistoryListener />
  </>
)

export default Layout
