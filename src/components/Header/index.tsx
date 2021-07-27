import { HEADER } from 'config'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, SxStyleProp } from 'rebass'
import { MOBILE_BREAKPOINT } from 'theme'
import NavLink from './NavLink'

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
            title="That's my head, also a link to home page."
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'black',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <Image src="/images/avatar.png" width={32} height={32} layout="responsive" />
          </Box>
        </Link>

        <Flex alignItems="center">
          {HEADER.map(({ label, href }) => (
            <Box key={href} marginX={1}>
              <NavLink href={href} label={label} active={pathname.startsWith(href)} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
