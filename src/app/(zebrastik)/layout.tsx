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

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="p-4 sm:px-0">{children}</main>
)

export default Layout
