import { HEADER } from 'config'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { Flex, Link } from 'theme-ui'
import { LAYOUT_WIDTH } from 'theme'
import NavLink from './NavLink'
import avatar from '../../../public/images/avatar.png'

const Header: React.FC = () => {
  const { pathname } = useRouter()

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
        paddingX: ['12px', '12px', 0],
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
        }}
      >
        <NextLink href="/" passHref>
          <Link
            title="That's my head, also a link to home page. Please press gently."
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: 32,
              height: 32,
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 'circle',
              borderColor: 'border',
              backgroundColor: 'black',
              '@media (hover: hover)': {
                '&:hover': {
                  borderColor: 'link',
                },
              },
            }}
          >
            <Image src={avatar} alt="That's head" />
          </Link>
        </NextLink>

        <Flex sx={{ alignItems: 'center', gap: 2 }}>
          {HEADER.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} active={pathname.startsWith(href)} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
