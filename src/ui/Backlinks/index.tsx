'use client'

import type { Backlink } from '@/lib/backlinks'

import Link from 'next/link'

import { BACKLINK_SOURCE_QUERY_PARAM } from './constants'
import { useScrollToBacklinkSource } from './useScrollToBacklinkSource'

const Backlinks: React.FC<{
  backlinks: Backlink[]
  sourceType: 'book' | 'post'
  sourceURL: string
}> = ({ backlinks, sourceType, sourceURL }) => {
  useScrollToBacklinkSource()

  if (backlinks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 rounded bg-neutral-900 p-4">
      <h4>Links to this {sourceType}</h4>

      <ul className="list-outside list-disc pl-4">
        {backlinks.map((backlink) => (
          <li key={backlink.url}>
            <Link
              className="hover:underline"
              href={`${backlink.url}?${BACKLINK_SOURCE_QUERY_PARAM}=${sourceURL}`}
            >
              {backlink.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Backlinks
