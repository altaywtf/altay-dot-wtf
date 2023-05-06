import { HEADER } from 'config'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { Flex, Link } from 'theme-ui'
import { LAYOUT_WIDTH } from 'ui/theme'
import NavLink from './NavLink'

const Header: React.FC = () => {
  const pathname = usePathname() || ''

  return (
    <Flex
      as="header"
      sx={{
        justifyContent: 'center',
        position: 'sticky',
        zIndex: 1,
        width: '100%',
        left: 0,
        top: 0,
        paddingX: [3, 3, 0],
        paddingY: 2,
        backgroundColor: 'backgroundAlpha',
        backdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      <Flex
        sx={{
          flex: 1,
          maxWidth: `calc(${LAYOUT_WIDTH}px + 8px)`,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginX: [-1, -1, 0],
        }}
      >
        <Link
          href="/"
          as={NextLink}
          title="That's my head, also a link to home page. Please press gently."
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: 32,
            height: 32,
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 'circle',
            borderColor: pathname === '/' ? 'border' : 'transparent',
            backgroundColor: 'black',
            '@media (hover: hover)': {
              ':hover': {
                borderColor: 'border',
              },
            },
          }}
        >
          <Image src="/images/avatar.png" alt="That's head" fill />
        </Link>

        <Flex sx={{ alignItems: 'center', gap: 1 }}>
          {HEADER.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} active={pathname.startsWith(href)} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
