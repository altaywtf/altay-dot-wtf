'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CgArrowLeft } from 'react-icons/cg'
import { usePathHistory } from 'ui/usePathHistory'

const ArtificialBackButton: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => {
  const router = useRouter()
  const prevPath = usePathHistory()
  const content = (
    <span className="flex items-center gap-1 text-neutral-400 hover:text-neutral-300">
      <CgArrowLeft />
      {label}
    </span>
  )

  return prevPath === href ? (
    <a className="cursor-pointer" onClick={router.back}>
      {content}
    </a>
  ) : (
    <Link href={href}>{content}</Link>
  )
}

export default ArtificialBackButton
