import { HEADER_NAV_LINKS } from 'config'
import Image from 'next/image'
import NavLink from './NavLink'

const Header: React.FC = () => (
  <header className="sticky left-0 top-0 z-10 flex w-full justify-center  px-0 py-2 backdrop-blur-lg sm:px-3">
    <div className="flex w-[var(--app-width)] items-center justify-between">
      <NavLink
        href="/"
        title="That's my head, also a link to home page. Please press gently."
        className={`relative h-[32px] w-[32px] overflow-hidden rounded-full border-2 border-transparent
           hover:border-neutral-900`}
        activeClassName="border-neutral-800"
      >
        <Image src="/images/avatar.png" alt="That's my head" fill sizes="100%" />
      </NavLink>

      <div className="flex-center flex gap-1">
        {HEADER_NAV_LINKS.map(({ label, href }) => (
          <NavLink
            key={href}
            href={href}
            className="rounded px-2 py-1 text-sm font-bold hover:bg-neutral-900"
            activeClassName="bg-neutral-800"
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  </header>
)

export default Header
