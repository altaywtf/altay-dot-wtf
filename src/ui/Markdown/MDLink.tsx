import Link from 'next/link'

type Props = {
  children: React.ReactNode
  href: string
}

const MDInternalLink: React.FC<Props> = ({ children, href }) => <Link href={href}>{children}</Link>

const MDExternalLink: React.FC<Props> = ({ children, href }) => (
  <a href={href} rel="noreferrer noopener" target="_blank">
    {children}
  </a>
)

export const MDLink: React.FC<Props> = ({ children, href }) => {
  if (href.startsWith('/')) {
    return <MDInternalLink href={href}>{children}</MDInternalLink>
  }

  return <MDExternalLink href={href}>{children}</MDExternalLink>
}
