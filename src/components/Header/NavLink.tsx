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
        paddingY: [1, 2],
        paddingX: [2, 3],
        lineHeight: 1,
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
