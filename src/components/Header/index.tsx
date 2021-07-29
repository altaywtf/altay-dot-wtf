import { HEADER } from 'config'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Button, SxStyleProp } from 'rebass'
import useDarkMode from 'use-dark-mode'
import { MOBILE_BREAKPOINT } from 'theme'
import { CgSun, CgMoon } from 'react-icons/cg'
import NavLink from './NavLink'
import avatar from '../../../public/images/avatar.png'

const headerStyle: SxStyleProp = {
  position: 'fixed',
  zIndex: 1,
  width: '100%',
  left: 0,
  top: 0,
  paddingX: 2,
  paddingY: 2,
  borderBottom: '1px solid',
  borderColor: 'borderMenu',
  backgroundColor: 'backgroundHeader',
  backdropFilter: 'saturate(200%) blur(20px)',
  '& > *': {
    lineHeight: 1,
  },
}

const Header: React.FC = () => {
  const { pathname } = useRouter()
  const darkMode = useDarkMode()

  return (
    <Flex as="header" sx={headerStyle} justifyContent="center">
      <Flex
        flex={1}
        maxWidth={MOBILE_BREAKPOINT}
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Box
            title="That's my head, also a link to home page. Please press gently."
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: 32,
              height: 32,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '50%',
              borderColor: 'backgroundSecondary',
              backgroundColor: 'black',
              '&:hover': {
                cursor: 'pointer',
                borderColor: 'linkPrimary',
              },
            }}
          >
            <Image src={avatar} />
          </Box>
        </Link>

        <Flex alignItems="center">
          <Flex>
            {HEADER.map(({ label, href }) => (
              <Box key={href} mx={1}>
                <NavLink href={href} label={label} active={pathname.startsWith(href)} />
              </Box>
            ))}
          </Flex>

          <Box ml={1} />

          <Box>
            <Button
              title="That's a button to switch between dark and light themes."
              onClick={darkMode.toggle}
              sx={{
                cursor: 'pointer',
                backgroundColor: 'background',
                color: 'textSecondary',
                fontSize: 0,
                borderRadius: 4,
                padding: 0,
                width: 40,
                height: 32,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: 'backgroundSecondary',
                  color: 'text',
                },
              }}
            >
              {darkMode.value ? <CgSun /> : <CgMoon />}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
