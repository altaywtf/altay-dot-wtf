'use client'

import { HEADER_NAV_LINKS } from 'config'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import Image from 'next/image'
import { Flex, Link } from 'theme-ui'
import { LAYOUT_WIDTH } from 'ui/theme'
import NavLink from './NavLink'

const Header: React.FC = () => {
  const pathname = usePathname() || ''

  return (
    <header
      className="bg-[rgba(0, 0, 0, 0.75)] sticky left-0 top-0 z-10 flex w-full justify-center px-0 py-2 sm:px-3"
      style={{ backdropFilter: 'saturate(180%) blur(20px)' }}
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
          {HEADER_NAV_LINKS.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} active={pathname.startsWith(href)} />
          ))}
        </Flex>
      </Flex>
    </header>
  )
}

export default Header
