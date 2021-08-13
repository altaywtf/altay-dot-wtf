import NextLink from 'next/link'
import { Link } from 'theme-ui'

type Props = {
  href: string
  label: string
  active: boolean
}

const NavLink: React.FC<Props> = ({ href, label, active }) => (
  <NextLink href={href} passHref>
    <Link
      variant="nav"
      sx={{
        textDecoration: 'none',
        fontSize: 0,
        paddingY: 1,
        paddingX: 2,
        lineHeight: 1,
        fontWeight: 'bold',
        borderRadius: 'default',
        color: active ? 'linkPrimary' : 'text',
        backgroundColor: active ? 'linkBackground' : 'transparent',
        '&:hover': {
          backgroundColor: active ? 'linkBackground' : 'linkHoverBackground',
        },
      }}
    >
      {label}
    </Link>
  </NextLink>
)

export default NavLink
