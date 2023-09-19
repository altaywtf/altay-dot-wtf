import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
}

const MDInternalLink: React.FC<Props> = ({ href, children }) => <Link href={href}>{children}</Link>

const MDExternalLink: React.FC<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
)

export const MDLink: React.FC<Props> = ({ href, children }) => {
  if (href.startsWith('/')) {
    return <MDInternalLink href={href}>{children}</MDInternalLink>
  }

  return <MDExternalLink href={href}>{children}</MDExternalLink>
}
