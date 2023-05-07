'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

// zort
type Props = LinkProps<any> & {
  activeClassName: string
}

const NavLink: React.FC<Props> = ({ href, children, className, activeClassName }) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`}>
      {children}
    </Link>
  )
}

export default NavLink
