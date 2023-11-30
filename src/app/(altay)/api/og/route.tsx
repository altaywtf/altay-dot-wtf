import type { Book, Page, ParsedQuery, Post } from 'lib/og/types'
import type { NextRequest } from 'next/server'

import { ImageResponse } from '@vercel/og'
import { OpenGraphImage } from 'lib/og/OpenGraphImage'
import qs from 'query-string'

export const runtime = 'edge'

const loadFont = async () => {
  const url = new URL('../../../../ui/theme/fonts/GT-America-Standard-Bold.ttf', import.meta.url)
  const res = await fetch(url)
  const fontData = await res.arrayBuffer()
  return fontData
}

const parseRequest = (request: NextRequest): ParsedQuery => {
  const { query } = qs.parseUrl(request.url)
  const { type } = query as unknown as ParsedQuery

  switch (type) {
    case 'post':
      return query as Post

    case 'book':
      return query as Book

    case 'page':
      return query as Page
  }
}

export const GET = async (req: NextRequest) => {
  const query = parseRequest(req)
  const fontData = await loadFont()

  return new ImageResponse(<OpenGraphImage query={query} />, {
    fonts: [
      {
        data: fontData,
        name: 'GT-America-Standard-Bold',
        style: 'normal',
      },
    ],
    height: 686,
    width: 1200,
  })
}
