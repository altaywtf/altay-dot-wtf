'use client'

import Link from 'next/link'
import type { Backlink } from 'lib/backlinks'
import { BACKLINK_SOURCE_QUERY_PARAM } from './constants'
import { useScrollToBacklinkSource } from './useScrollToBacklinkSource'

const Backlinks: React.FC<{
  sourceType: 'book' | 'post'
  sourceURL: string
  backlinks: Backlink[]
}> = ({ sourceType, sourceURL, backlinks }) => {
  useScrollToBacklinkSource()

  if (backlinks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 rounded bg-neutral-900 p-4">
      <h4>Links to this {sourceType}</h4>

      <ul className="list-inside list-disc">
        {backlinks.map((backlink) => (
          <li key={backlink.url}>
            <Link
              href={`${backlink.url}?${BACKLINK_SOURCE_QUERY_PARAM}=${sourceURL}` as any}
              className="hover:underline"
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
