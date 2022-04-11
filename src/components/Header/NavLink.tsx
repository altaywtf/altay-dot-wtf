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
        fontSize: 0,
        paddingY: '.4rem',
        paddingX: 2,
        lineHeight: 1,
        fontWeight: 600,
        borderRadius: 'default',
        color: 'text',
        backgroundColor: active ? 'buttonBackground' : 'transparent',
        '@media (hover: hover)': {
          ':hover': {
            backgroundColor: 'buttonBackground',
            color: 'text',
          },
        },
      }}
    >
      {label}
    </Link>
  </NextLink>
)

export default NavLink
