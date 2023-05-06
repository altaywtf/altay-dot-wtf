import { Metadata } from 'next'
import { zebrastikCopy } from 'config'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'zebrastik',
  description: zebrastikCopy.description,
  openGraph: {
    title: 'zebrastik',
    description: zebrastikCopy.description,
  },
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ClientLayout>{children}</ClientLayout>
)

export default Layout
