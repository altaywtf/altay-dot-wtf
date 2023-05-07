import { Metadata } from 'next'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import RootStyleRegistry from '../emotion'
import ThemeProvider from 'ui/ThemeProvider'
import ForceClient from 'ui/ForceClient'
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
  <RootStyleRegistry>
    <ThemeProvider>
      <ForceClient>
        <Header />
        <main>{children}</main>
        <PathHistoryListener />
      </ForceClient>
    </ThemeProvider>
  </RootStyleRegistry>
)

export default Layout
