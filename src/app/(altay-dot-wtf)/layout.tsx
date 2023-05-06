import { Metadata } from 'next'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from 'config'
import ClientLayout from './ClientLayout'
import { getOpenGraphImage } from 'lib/utils/openGraph'

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
  <ClientLayout>{children}</ClientLayout>
)

export default Layout
