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
      sx={{
        textDecoration: 'none',
        fontSize: 0,
        paddingY: '6px',
        paddingX: 2,
        lineHeight: 1,
        fontWeight: 'bold',
        borderRadius: 'default',
        color: active ? 'link' : 'text',
        backgroundColor: active ? 'linkBackground' : 'transparent',
        border: 'none',
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: active ? 'linkBackground' : 'buttonBackground',
          },
        },
      }}
    >
      {label}
    </Link>
  </NextLink>
)

export default NavLink
