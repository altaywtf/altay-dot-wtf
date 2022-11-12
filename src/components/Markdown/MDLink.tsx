import NextLink from 'next/link'
import { Link } from 'theme-ui'

type Props = {
  href: string
  children: React.ReactNode
}

const MDInternalLink: React.FC<Props> = ({ href, children }) => (
  <Link
    as={NextLink}
    href={href}
    sx={{
      '&.scrolled-source-link': {
        backgroundColor: 'link',
        color: 'background',
        paddingX: 1,
        borderRadius: 4,
      },
      '@media (hover: hover)': {
        '&.scrolled-source-link:hover': {
          color: 'background',
        },
      },
    }}
  >
    {children}
  </Link>
)

const MDExternalLink: React.FC<Props> = ({ href, children }) => (
  <Link href={href} target="_blank" rel="noreferrer noopener">
    {children}
  </Link>
)

const MDLink: React.FC<Props> = ({ href, children }) => {
  if (href.startsWith('/')) {
    return <MDInternalLink href={href}>{children}</MDInternalLink>
  }

  return <MDExternalLink href={href}>{children}</MDExternalLink>
}

export default MDLink
