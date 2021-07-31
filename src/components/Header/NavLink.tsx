import NextLink from 'next/link'
import { Link } from 'rebass'

type Props = {
  href: string
  label: string
  active: boolean
}

const NavLink: React.FC<Props> = ({ href, label, active }) => (
  <NextLink href={href} passHref>
    <Link
      href={href}
      variant="nav"
      sx={{
        textDecoration: 'none',
        textAlign: 'center',
        fontSize: [14, 0],
        paddingX: 3,
        paddingY: 2,
        fontWeight: 'bold',
        borderRadius: 4,
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
