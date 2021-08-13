import { HEADER } from 'config'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Image from 'next/image'
import { Flex, Box, Link } from 'theme-ui'
import { LAYOUT_WIDTH } from 'theme'
import NavLink from './NavLink'
import ColorModeButton from './ColorModeButton'
import avatar from '../../../public/images/avatar.png'

const Header: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <Flex
      as="header"
      sx={{
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        left: 0,
        top: 0,
        paddingX: [3, 2, 2],
        paddingY: 2,
        borderBottom: '1px solid',
        borderColor: 'borderMenu',
        backgroundColor: 'backgroundHeader',
        backdropFilter: 'saturate(200%) blur(20px)',
        '& > *': {
          lineHeight: 1,
        },
      }}
    >
      <Flex
        sx={{
          flex: 1,
          maxWidth: LAYOUT_WIDTH,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <NextLink href="/" passHref>
          <Link
            title="That's my head, also a link to home page. Please press gently."
            sx={{
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              width: 32,
              height: 32,
              borderWidth: 2,
              borderStyle: 'solid',
              borderRadius: 'circle',
              borderColor: 'backgroundSecondary',
              backgroundColor: 'black',
              '&:hover': {
                borderColor: 'linkPrimary',
              },
            }}
          >
            <Image src={avatar} alt="That's head" />
          </Link>
        </NextLink>

        <Flex sx={{ alignItems: 'center' }}>
          <Flex>
            {HEADER.map(({ label, href }) => (
              <Box key={href} mx={1}>
                <NavLink href={href} label={label} active={pathname.startsWith(href)} />
              </Box>
            ))}
          </Flex>

          <Box ml={1} />

          <Box>
            <ColorModeButton />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
