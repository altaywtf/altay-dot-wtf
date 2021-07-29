import NextLink from 'next/link'
import { Link } from 'rebass'

type Props = { href: string }

const MDInternalLink: React.FC<Props> = ({ href, children }) => (
  <NextLink href={href} passHref>
    <Link
      display="inline"
      href={href}
      sx={{
        '&.scrolled-source-link': {
          backgroundColor: 'linkPrimary',
          color: 'background',
          paddingX: 1,
          borderRadius: 4,
        },
        '&.scrolled-source-link:hover': {
          color: 'background',
        },
      }}
    >
      {children}
    </Link>
  </NextLink>
)

const MDExternalLink: React.FC<Props> = ({ href, children }) => (
  <Link display="inline" href={href} target="_blank" rel="noreferrer noopener">
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
