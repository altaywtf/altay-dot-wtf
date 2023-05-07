import { Metadata } from 'next'
import { zebrastikCopy } from 'config'

export const metadata: Metadata = {
  title: 'zebrastik',
  description: zebrastikCopy.description,
  openGraph: {
    title: 'zebrastik',
    description: zebrastikCopy.description,
  },
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => <main>{children}</main>

export default Layout
