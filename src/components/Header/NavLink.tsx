import NextLink from 'next/link'
import { Link } from 'theme-ui'

type Props = {
  href: string
  label: string
  active: boolean
}

const NavLink: React.FC<Props> = ({ href, label, active }) => (
  <NextLink href={href} passHref legacyBehavior>
    <Link
      sx={{
        fontSize: 0,
        paddingY: '.4rem',
        paddingX: 2,
        lineHeight: 1,
        fontFamily: 'heading',
        fontWeight: 'heading',
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
