import NextLink from 'next/link'
import { Link, Text } from 'rebass'

type Props = {
  href: string
  label: string
  active: boolean
}

const NavLink: React.FC<Props> = ({ href, label, active }) => (
  <NextLink href={href} passHref>
    <Link
      color="text"
      sx={{
        '&:hover': {
          cursor: active ? 'default' : 'pointer',
        },
      }}
    >
      <Text
        sx={{
          width: '100%',
          textAlign: 'center',
          fontSize: 0,
          paddingX: [2, 3],
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
      </Text>
    </Link>
  </NextLink>
)

export default NavLink
