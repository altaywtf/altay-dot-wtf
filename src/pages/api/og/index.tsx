import type { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import qs from 'query-string'
import { OpenGraphImage } from 'lib/og/OpenGraphImage'
import type { ParsedQuery, Post, Book, Page } from 'lib/og/types'

const loadFont = () => {
  const url = new URL(
    '../../../ui/theme/fonts/GT-America-Standard-Bold.ttf',
    import.meta.url,
  ) as any

  return fetch(url).then((res) => res.arrayBuffer())
}

const parseRequest = (req: NextRequest): ParsedQuery => {
  const { query } = qs.parseUrl(req.url)
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

const handler = async (req: NextRequest) => {
  const query = parseRequest(req)
  const fontData = await loadFont()

  return new ImageResponse(<OpenGraphImage query={query} />, {
    width: 1200,
    height: 686,
    fonts: [
      {
        name: 'GT-America-Standard-Bold',
        data: fontData,
        style: 'normal',
      },
    ],
  })
}

export const config = {
  runtime: 'experimental-edge',
}

export default handler
