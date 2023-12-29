'use client'

import { usePathHistory } from '@/ui/usePathHistory'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ArtificialBackButton: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => {
  const router = useRouter()
  const prevPath = usePathHistory()
  const content = (
    <span className="flex items-center gap-1 text-neutral-400 hover:text-neutral-300">
      <MoveLeft className="mt-0.5" />
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
